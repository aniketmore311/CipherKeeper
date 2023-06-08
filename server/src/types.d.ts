import {Request, Response, NextFunction, Application} from 'express'

export type AsyncHandler = (req: Request, res: Response, next: NextFunction )=> Promise<any>
export type ControllerRegisterFn = (app: Application) => void

export type UsersTableRow = {
    username: string,
    password: string,
    created_at: Date,
    updated_at : Date
}

export type UserRespDTO = {
	username: string
}

export type PasswordsTableRow = {
	id: number,
	encrypted_name : string ,
	encrypted_value: string,
	owner : string,
	created_at: Date,
	updated_at: Date,
}

export type PasswordRespDTO = {
	id: number,
	encryptedName: string,
	encryptedValue: string,
	createdAt: Date,
	updatedAt: Date
}