import axios, { Axios } from "axios";
type Credentials = {
  grantType: string;
  clientId: string;
  clientSecret: string;
};

export class PlantBookAPI {
  private isTokenSet = false as boolean;
  public axios: Axios;

  constructor(baseURL: string, credentials: Credentials) {
    this.axios = axios.create({ baseURL });
    const params = new URLSearchParams();
    params.append("grant_type", credentials.grantType);
    params.append("client_id", credentials.clientId);
    params.append("client_secret", credentials.clientSecret);

    if (!this.isTokenSet) {
      this.axios
        .post("/token/", params)
        .then((response) => {
          this.isTokenSet = true;
          this.axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
        })
        .catch((e) => {
          // tslint:disable-next-line:no-console
          console.error(e);
        });
    }
  }

  api() {
    return this.axios;
  }
}

export default { PlantBookAPI };
