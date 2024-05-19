export class Atendimentos {
  id: number;
  data: string;
  hora: string;
  modalidade: ModalidadeEnum;
  medicoId: number;
  pacienteId: number;
  adminId: number;
}

enum ModalidadeEnum {
  PRESENCIAL = 1,
  TELEMEDICINA = 2,
}
