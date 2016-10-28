import { NEW_OPPORTUNITY, NEW_MESSAGE, SENT_OFFER, WITHDRAWN, WON, LOST, EXPIRED, CLOSED, ARCHIVED, REPLIED } from '../../dealer/private/opportunities/Opportunities.reducer';

export default function StatusMap(state) {
  switch (state) {
    case NEW_OPPORTUNITY:
      return {
        label: "Nueva Oportunidad",
        klass: "status-new"
      };
    case SENT_OFFER:
      return {
        label: "Oferta enviada",
        klass: "status-requested"
      };
    case NEW_MESSAGE:
      return {
        label: "Nuevo Mensaje",
        klass: "status-message"
      };
    case WITHDRAWN:
      return {
        label: "Withdrawn",
        klass: "status-received"
      };
    case WON:
      return {
        label: "Ganada",
        klass: "status-won"
      };
    case LOST:
      return {
        label: "Oferta expirada",
        klass: "status-expire"
      };
    case ARCHIVED:
      return {
          label: "Archivadas",
          klass: "status-archived"
      };
    case CLOSED:
      return {
        label: 'Perdida',
        klass: 'status-closed'
      };
    case EXPIRED:
      return {
        label: 'Oferta expirada',
        klass: 'status-offer-expired'
      };
    case REPLIED:
      return {
        label: 'Mensaje enviado',
        klass: 'status-replied'
      };
    default:
      return {
        label: state,
        klass: state
      }
  }
};
