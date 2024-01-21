import userModel from '../models/user';

export const getUserByEmail = (email : string) => {
    return userModel.findOne( {email} );
}

export const createUser = (body : Record<string, any>) => {
    new userModel(body).save().then((user) => user.toObject);
}

export const getAnUser = (email: string, token : string) =>{
    
}