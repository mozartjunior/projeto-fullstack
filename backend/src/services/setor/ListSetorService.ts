export class ListSetorService {

  constructor(private setorRepository: any) {}

  async execute() {
    return this.setorRepository.findAll();
  }
}