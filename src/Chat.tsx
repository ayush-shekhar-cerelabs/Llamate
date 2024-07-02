import "./stylesheets/Chat.css";

import pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import React from "react";

import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Button, Paper } from "@mui/material";

import InputWindow from "./InputWindow";
import { Conversation, Message } from "./types/Chat";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Chat() {
  const [userInput, setUserInput] = React.useState<string>("");
  const [conversation, setConversation] = React.useState<Conversation>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const newMessage: Message = {
      user: userInput,
      assistant: "Hi there!",
    };

    const conversationsClone = JSON.parse(JSON.stringify(conversation));
    setConversation([...conversationsClone, newMessage]);
    setUserInput("");
  };

  const handleClearChat = (): void => {
    setConversation([]);
  };

  const handleExportChat = (): void => {
    const chatContent = conversation.map((msg) => ({
      text: `User: ${msg.user}\nAssistant: ${msg.assistant}\n\n`,
    }));

    const docDefinition = {
      content: chatContent,
    };

    pdfMake.createPdf(docDefinition).download("llamatechat.pdf");
  };

  return (
    <Paper square className="Chat">
      <Paper className="Chat-Button">
        <Button
          variant="outlined"
          startIcon={<DeleteSweepIcon />}
          onClick={handleClearChat}
        >
          Clear chat
        </Button>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportChat}
        >
          Export Chat
        </Button>
      </Paper>
      <Paper className="Chat-Display">
        {conversation.map((msg, index) => (
          <Paper key={index}>
            <Paper>User: {msg.user}</Paper>
            <Paper>Assistant: {msg.assistant}</Paper>
          </Paper>
        ))}
      </Paper>

      <InputWindow
        value={userInput}
        onChange={handleChange}
        onSubmit={handleSubmit}
      ></InputWindow>
    </Paper>
  );
}

export default Chat;
