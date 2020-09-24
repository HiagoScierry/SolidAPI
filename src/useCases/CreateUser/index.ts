import { MailtrapMailProvider } from "../../repositories/implemantations/MailtrapMailProvider";
import { PostgresUsersRepository } from "../../repositories/implemantations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
const postgresUserRepository = new PostgresUsersRepository();

const createUserUseCase = new CreateUserUseCase(
    postgresUserRepository,
    mailtrapMailProvider
);


const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserUseCase, createUserController };