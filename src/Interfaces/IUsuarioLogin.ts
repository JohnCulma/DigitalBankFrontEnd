export interface IUsuarioLogin {
    isSuccess:      boolean;
    result:         UsuarioLogin[];
    displayMessage: string;
    errorMessage:   null;
}

export interface UsuarioLogin {

    UserName:       string;    
    Password:    string;
}
