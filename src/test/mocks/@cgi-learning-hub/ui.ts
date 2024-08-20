// @ts-nocheck
import { SvgIconComponent } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
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
const TextInput = TextField;

const CloseIcon: SvgIconComponent = jest.fn(() => "Mocked CloseIcon");

const mockedModule = {
  ...actualModule,
  Ht,
  Loader,
  Typography,
  Box,
  Button,
  TextInput,
  CloseIcon,
};

export = mockedModule;
