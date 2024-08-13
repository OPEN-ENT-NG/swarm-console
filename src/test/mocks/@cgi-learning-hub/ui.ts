// @ts-nocheck
import { Typography } from "@mui/material";
import path from "path";
import { FC } from "react";

type LoaderProps = {};

type HtFunction = () => () => void;

interface ActualModule {
  Loader?: FC<LoaderProps>;
}

const realModulePath = path.resolve(__dirname, "../../../../node_modules/@cgi-learning-hub/ui");

console.log("Attempting to require from:", realModulePath);

const actualModule = jest.requireActual<ActualModule>(realModulePath);

console.log("Actual module contents:", actualModule);

const Ht: HtFunction = function () {
  return function () {};
};

const Loader: FC<LoaderProps> = actualModule.Loader || jest.fn(() => "Mocked Loader");

const mockedModule = {
  ...actualModule,
  Ht,
  Loader,
  Typography,
};

export = mockedModule;
