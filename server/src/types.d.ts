import {Request, Response, NextFunction, Application} from 'express'

export type AsyncHandler = (req: Request, res: Response, next: NextFunction )=> Promise<any>
export type ControllerRegisterFn = (app: Application) => void

export type UsersTableRow = {
    username: string,
    password: string,
    created_at: Date,
    updated_at : Date
}

export type PasswordsTableRow = {
	id: number,
	name : string ,
	encrypted_value: string,
	owner : string,
	created_at: Date,
	updated_at: Date,
}