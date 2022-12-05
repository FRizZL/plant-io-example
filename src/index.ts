import express from "express";
import { PlantBookAPI } from "./plugins/plantbook-io";
import cors from "cors";
import { AxiosError, AxiosResponse } from "axios";

  const plantBookApi = new PlantBookAPI("https://open.plantbook.io/api/v1", {
    grantType: "client_credentials",
    clientId: "--your-client-id--",
    clientSecret: "--your-client-secret--",
  });

  
  const app = express();
  app.use(cors());
  // Custom routes
  // As you can see the server has one entrance: http://__serverURL__/plantinfo/?plant=acer
  app.get("/plantinfo/", (req, res) => {
    plantBookApi
      .api()
      .get(`/plant/detail/${req.query.plant}/`)
      .then((response: AxiosResponse) => {
        res.send(response.data);
      })
      .catch((e: AxiosError) => {
        if (e.code === "404") {
          res.send(e.toJSON());
        } else {
          // tslint:disable-next-line:no-console
          console.error(e.toJSON());
          res.sendStatus(500);
        }
      });
  });
  
  app.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server running; port 3000`);
  });