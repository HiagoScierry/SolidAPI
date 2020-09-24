import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRquestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUserRepository,
        private mailProvider: IMailProvider
    ) { }

    async execute(data: ICreateUserRquestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        if (userAlreadyExists) {
            throw new Error('User Already Exists');
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe do Hiago',
                email: 'equipedo@Hiago.com'
            },
            subject: 'Seja bem-vindo à plataforma',
            body: '<p>Você ja pode fazer login em nossa plataforma<p>'
        });
    }
}