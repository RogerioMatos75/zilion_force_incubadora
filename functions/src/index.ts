import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";

// Inicializa o SDK do Firebase Admin uma única vez
admin.initializeApp();

// Pega a chave da API e o remetente do SendGrid da configuração de ambiente das functions
const SENDGRID_API_KEY = functions.config().sendgrid.key;
const SENDER_EMAIL = functions.config().sendgrid.sender;

// Valida e configura a chave da API do SendGrid
if (!SENDGRID_API_KEY || !SENDER_EMAIL) {
  console.error("Erro: A chave da API do SendGrid (sendgrid.key) ou o email remetente (sendgrid.sender) não estão configurados. Execute 'firebase functions:config:set sendgrid.key=... sendgrid.sender=...'");
} else {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

/**
 * Função acionada na criação de um novo documento na coleção 'submissions'.
 * Envia um e-mail de confirmação para o criador.
 */
export const onSubmissionCreate = functions.region("southamerica-east1").firestore
  .document("submissions/{submissionId}")
  .onCreate(async (snap, context) => {
    // Garante que a chave da API foi configurada antes de tentar enviar
    if (!SENDGRID_API_KEY || !SENDER_EMAIL) {
      functions.logger.error("A API do SendGrid não está configurada. E-mail não enviado.");
      return null;
    }

    const submissionData = snap.data();
    if (!submissionData) {
      functions.logger.error("Dados da submissão não encontrados.", {submissionId: context.params.submissionId});
      return null;
    }

    const creatorEmail = submissionData.creatorEmail;
    const creatorName = submissionData.creatorName || "Criador(a)";
    const hqTitle = submissionData.hqTitle;

    if (!creatorEmail) {
      functions.logger.error("E-mail do criador não encontrado na submissão.", {submissionId: context.params.submissionId});
      return null;
    }

    functions.logger.log(`Iniciando envio de e-mail para ${creatorEmail} para a submissão ${context.params.submissionId}`);

    const msg = {
      to: creatorEmail,
      from: {
        name: "Incubadora Zilion Force",
        email: SENDER_EMAIL,
      },
      subject: `Confirmação de Recebimento: Seu projeto "${hqTitle}"`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6;">
          <h2>Olá, ${creatorName}!</h2>
          <p>Recebemos com sucesso a sua submissão para o projeto de HQ intitulado <strong>"${hqTitle}"</strong>.</p>
          <p>Nossa equipe de curadores (a Diretoria) irá analisar seu material com atenção. Você poderá acompanhar o status do seu projeto através do seu painel de criador em breve.</p>
          <p>Agradecemos seu interesse na Incubadora Zilion Force!</p>
          <br>
          <p>Atenciosamente,</p>
          <p><strong>Equipe Zilion Force</strong></p>
        </div>
      `,
    };

    try {
      await sgMail.send(msg);
      functions.logger.log(`E-mail de confirmação enviado com sucesso para ${creatorEmail}.`);
      return null;
    } catch (error) {
      functions.logger.error(`Falha ao enviar e-mail para ${creatorEmail}`, error);
      // Você pode adicionar um tratamento de erro mais robusto aqui se necessário
      return null;
    }
  });
