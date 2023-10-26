import { Injectable } from '@nestjs/common';
import { AuthRegisterUserDto } from './dto/auth.register.user.dto';
import { AuthLoginUserDto } from './dto/auth.login.user.dto';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  
} from 'amazon-cognito-identity-js';

@Injectable()
export class AuthService {
  private readonly userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    });
  }

  async registerUser(authRegisterUserDto: AuthRegisterUserDto) : Promise<any> {
    const { name, email, password, role } = authRegisterUserDto;

    return new Promise((resolve, reject) => {
    
      this.userPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({
            Name: 'nickname',
            Value: name,
          }),
          new CognitoUserAttribute({
            Name: 'custom:role',
            Value: role,
          }),
        ],

        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async authenticateUser(authLoginUserDto: AuthLoginUserDto) : Promise<any> {
    const { email, password } = authLoginUserDto;
    const userData = {
      Username: email,
      Pool: this.userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getIdToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }
}
