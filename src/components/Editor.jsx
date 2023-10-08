import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateEditorContent } from "../../slices/editorSlice";
import Head from 'next/head'
// import { Button, Modal, Icon, Label, Header, Segment, Item } from 'semantic-ui-react'

const SunEditor = dynamic(async () => await import("suneditor-react").then((a) => a), {
  ssr: false,
});
const buttonList = dynamic(async () => await import("suneditor-react").then((a) => a), {
  ssr: false,
});
const {
  align,
  font,
  fontSize,
  fontColor,
  hiliteColor,
  horizontalRule,
  image,
  template,
} = dynamic(async () => await import("suneditor/src/plugins").then((a) => a), {
  ssr: false,
});
import Publish from "./Publish";
import { Modal,Box } from '@mui/material'
import styles from "../styles/Write.module.css";

const CustomEditor = () => {
  const [windowWidth,setwindowWidth]= useState(window.innerWidth)
  // const windowWidth = useRef(window.innerWidth);
  const editor = useRef(null);
  const state = useSelector((state) => state.editorSlice.content);
  const publishModelState = useSelector((state) => state.publisherDialogueSlice.state)

  const dispatch = useDispatch();

  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };

  useEffect(()=>{
    setwindowWidth(window.innerWidth)
  },[windowWidth])

  var style1 = {
    // dispatch:'flex',
    position: 'absolute',
    width:'70%',
    top: '50%',
    left: '50%',
  //  bottom:'0%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  let editorWidth = '0px'
  if(windowWidth >= 780){
    editorWidth = '780px'
  }
  if(windowWidth <= 480){
    editorWidth = '100%'
    style1.width = '80%'
    style1.p = 2
    style1.top='50%'
    style1.left= '45%'
    // style1.bottom='50%'
  }

  return (
    <>
      <Head>
        <title>gitgurus</title>
        <meta
          key="og:title"
          name="og:title"
          content='gitgurus'
        />

        <meta data-rh="true" name="description" content={'gitgurus.com'}></meta>
        <meta data-rh="true" property="og:description" content={'gitgurus.com'}></meta>
      </Head>

      <div>
        <Modal
          open={publishModelState}
        >
          <Box sx={style1}>
            <Publish />
          </Box>
        </Modal>
      </div>

      <SunEditor
        className={styles["custom-suneditor"]}
        getSunEditorInstance={(sunEditor) => getSunEditorInstance(sunEditor)}
        defaultValue="<h1 style=`text-align: center` >WRITE YOUR TITLE HERE....</h1>"
        width={editorWidth}
        height="600px"
        autoFocus={true}
        setOptions={{
          showPathLabel: false,
          allowedTags: "style",
          attributesWhitelist: {
            all: "style",
            input: "checked",
          },
          // buttonList: [
          //   // Default
          //   ["undo", "redo"],
          //   ["font", "fontSize", "formatBlock"],
          //   ["paragraphStyle", "blockquote"],
          //   [
          //     "bold",
          //     "underline",
          //     "italic",
          //     "strike",
          //     "subscript",
          //     "superscript",
          //   ],
          //   ["fontColor", "hiliteColor", "textStyle"],
          //   ["removeFormat"],
          //   ["outdent", "indent"],
          //   ["align", "horizontalRule", "list", "lineHeight"],
          //   ["table", "link", "image", "video"],
          //   ['fullScreen', 'showBlocks', 'codeView'],


          // ],

          buttonList: [
        // default
        ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle", "blockquote"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "image", "video"],
        // (min-width: 992)
        ['%992', [
          ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle", "blockquote"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "image", "video","codeView"],
        ]],
        // (min-width: 767)
        ['%767', [
          ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle", "blockquote"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "image", "video"],
        ]],
        // (min-width: 480)
        ['%480', [
            ['undo', 'redo'],
            ["font", "fontSize", "formatBlock"], 
            ["paragraphStyle", "blockquote","bold", "superscript","align", "horizontalRule"],["underline","hiliteColor", "textStyle",],
            ["removeFormat","outdent", "indent",
              "italic",
              "strike",
              "subscript","link",
             ],
              
            [ "list", "lineHeight"],
            ["table",  "image", "video"],
        ]]
    ]

        }}

        onChange={() => {
          dispatch(updateEditorContent(editor.current.getContents()))
        }}
      />
    </>
  );
};

export default CustomEditor;
