import express from "express";
// import { createUser, getUserByEmail } from "db";
import { authentication, random } from "../helpers/index";
import { getUserByEmail, createUser } from "db/users";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
      return res.status(400).send("Bad Request");
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const salt = random();
    const user = await createUser({
      userName,
      email,
      authentication: {
        password: authentication(salt, password),
        salt,
      },
    });
    return res.status(201).send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
};
