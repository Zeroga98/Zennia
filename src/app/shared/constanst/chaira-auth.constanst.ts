import { environment } from '../../../environments/environment';

export class ChairaAuth {
	
    public static client_id: string = "1534024067731"; 
    public static client_secret: string = "d93wynlrxz34mev7q0rw5vk0jm6pog"; 
    public static callback_url: string = "http://localhost:4700/login"; 
    public static urlAuthLogin: string = `https://chaira.udla.edu.co/api/v0.1/oauth2/authorize.asmx/auth?response_type=code&client_id=${ChairaAuth.client_id}&redirect_uri=${ChairaAuth.callback_url}&state=xyz
`;
}