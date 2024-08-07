import "./stylesheets/App.css";

import { useState } from "react";

import { Paper } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Chat from "./Chat";
import localStorageConfig from "./configs/localStorage";
import templates from "./configs/templates";
import uiConfig from "./configs/ui";
import ConfigurationSidebar from "./ConfigurationSidebar";
import CustomAppBar from "./CustomAppBar";
import CustomSnackbar from "./CustomSnackbar";
import PromptEngineeringSidebar from "./PromptEngineeringSidebar";
import { Examples } from "./types/PromptEngineeringSidebar";

import type { AlertProps, PaletteOptions } from "@mui/material";

function App() {
  // get stuff from local storage
  let tempThemePalette: PaletteOptions["mode"];
  const savedTheme = localStorage.getItem(localStorageConfig.themeKey);
  if (savedTheme === null) {
    tempThemePalette = uiConfig.defaultThemePalette;

    localStorage.setItem(
      localStorageConfig.themeKey,
      JSON.stringify(uiConfig.defaultThemePalette)
    );
  } else {
    try {
      tempThemePalette = JSON.parse(savedTheme) as PaletteOptions["mode"];
    } catch {
      console.error(`Invalid theme palette: ${savedTheme}`);
      tempThemePalette = uiConfig.defaultThemePalette;
      localStorage.setItem(
        localStorageConfig.themeKey,
        JSON.stringify(uiConfig.defaultThemePalette)
      );
    }
  }

  // state
  const [isPromptEngineeringSidebarOpen, changeIsPromptEngineeringSidebarOpen] =
    useState(false);
  const [currentThemePalette, changeCurrentThemePalette] =
    useState(tempThemePalette);
  const [activeSystemPrompt, changeActiveSystemPrompt] = useState<string>(
    templates[0].systemPrompt
  );
  const [deployment, setDeployment] = useState("");
  const [messageHistoryLimit, setMessageHistoryLimit] = useState(20);
  const [isConfigSidebarOpen, setIsConfigSidebarOpen] =
    useState<boolean>(false);
  const [activeExamples, changeActiveExamples] = useState<Examples>(
    templates[0].fewShotExamples.map((ele) => {
      return { user: ele.userInput, assistant: ele.chatbotResponse };
    })
  );
  const [isSnackbarOpen, changeIsSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, changeSnackbarMessage] = useState<string>("success");
  const [alertSeverity, changeAlertSeverity] =
    useState<AlertProps["severity"]>("info");
  const [alertVariant, changeAlertVariant] = useState<AlertProps["variant"]>();
  const [showAlertTitle, changeShowAlertTitle] = useState(false);
  const [systemPrompt, changeSystemPrompt] = useState<string>(
    templates[0].systemPrompt
  );
  const [examples, changeExamples] = useState<Examples>(
    templates[0].fewShotExamples.map((ele) => {
      return { user: ele.userInput, assistant: ele.chatbotResponse };
    })
  );

  // functions
  const handleThemeToggle = () => {
    if (currentThemePalette === "dark") {
      changeCurrentThemePalette("light");
      localStorage.setItem(
        localStorageConfig.themeKey,
        JSON.stringify("light")
      );
    } else {
      changeCurrentThemePalette("dark");
      localStorage.setItem(localStorageConfig.themeKey, JSON.stringify("dark"));
    }
  };

  const handleSnackbarOpen = (
    snackbarMessage: string,
    alertSeverity: AlertProps["severity"],
    alertVariant: AlertProps["variant"] = "filled",
    showAlertTitle: boolean = true
  ) => {
    changeIsSnackbarOpen(true);
    changeSnackbarMessage(snackbarMessage);
    changeAlertSeverity(alertSeverity);
    changeAlertVariant(alertVariant);
    changeShowAlertTitle(showAlertTitle);
  };

  const handleSnackbarClose = () => {
    changeIsSnackbarOpen(false);
  };

  // use effect
  // misc
  const theme = createTheme({
    palette: {
      mode: currentThemePalette,
    },
  });

  const handleConfigSidebarClose = () => {
    setIsConfigSidebarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper square className="App">
        <CustomAppBar
          changeIsPromptEngineeringSidebarOpen={
            changeIsPromptEngineeringSidebarOpen
          }
          activeSystemPrompt={activeSystemPrompt}
          activeExamples={activeExamples}
          changeActiveSystemPrompt={changeActiveSystemPrompt}
          changeActiveExamples={changeActiveExamples}
          handleSnackbarOpen={handleSnackbarOpen}
          changeSystemPrompt={changeSystemPrompt}
          changeExamples={changeExamples}
          setIsConfigSidebarOpen={setIsConfigSidebarOpen}
          handleThemeToggle={handleThemeToggle}
          currentThemePalette={currentThemePalette}
        />
        <Chat></Chat>
        <PromptEngineeringSidebar
          isPromptEngineeringSidebarOpen={isPromptEngineeringSidebarOpen}
          changeIsPromptEngineeringSidebarOpen={
            changeIsPromptEngineeringSidebarOpen
          }
          activeSystemPrompt={activeSystemPrompt}
          activeExamples={activeExamples}
          changeActiveSystemPrompt={changeActiveSystemPrompt}
          changeActiveExamples={changeActiveExamples}
          handleSnackbarOpen={handleSnackbarOpen}
          systemPrompt={systemPrompt}
          changeSystemPrompt={changeSystemPrompt}
          examples={examples}
          changeExamples={changeExamples}
        />
        <CustomSnackbar
          isSnackbarOpen={isSnackbarOpen}
          snackbarMessage={snackbarMessage}
          alertSeverity={alertSeverity}
          alertVariant={alertVariant}
          handleSnackbarClose={handleSnackbarClose}
          showAlertTitle={showAlertTitle}
        />
        <ConfigurationSidebar
          isOpen={isConfigSidebarOpen}
          onClose={handleConfigSidebarClose}
          messageHistoryLimit={messageHistoryLimit}
          setMessageHistoryLimit={setMessageHistoryLimit}
          deployment={deployment}
          setDeployment={setDeployment}
        />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
