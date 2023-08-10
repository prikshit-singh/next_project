import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { toggolDialogue } from "../../slices/piblisherDialogueSlice";

import { useDispatch, useSelector } from "react-redux";
import { updateEditorContent } from "../../slices/editorSlice";
const SunEditor = dynamic(async() => await import("suneditor-react").then((a) => a), {
  ssr: false,
});
const buttonList = dynamic(async() =>await import("suneditor-react").then((a) => a), {
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
} = dynamic(async() =>await import("suneditor/src/plugins").then((a) => a), {
  ssr: false,
});

import styles from "../styles/Write.module.css";

const CustomEditor = () => {
  const editor = useRef(null);
  const state = useSelector((state) => state.editorSlice.content);

  const dispatch = useDispatch();

  const getSunEditorInstance = (sunEditor) => {
    console.log(1,sunEditor)
    editor.current = sunEditor;
  };
 

  const handleRequest = () => {
    dispatch(updateEditorContent(editor.current.getContents()));
    dispatch(toggolDialogue(false));
    console.log(editor)
  };

  return (
    <>
    <div className={styles.publishButton}>
    <button
      // className={styles.publishButton}
        onClick={() => {
          handleRequest();
        }}
      >
        Publish
      </button>
    </div>
     
      <SunEditor
        className={styles["custom-suneditor"]}
        getSunEditorInstance={(sunEditor) => getSunEditorInstance(sunEditor)}
        defaultValue="<h1 style=`text-align: center` >WRITE YOUR TITLE HERE....</h1>"
        // placeholder="<h1 style=`text-align: center` >WRITE YOUR TITLE HERE....</h1>"
        width="740px"
        height="600px"
        style={{ border: "2px solid green",fontColor:'black',color:'black' }}
        autoFocus={true}
        // setAllPlugins={false}
        setOptions={{
          showPathLabel: false,
          allowedTags: "style",
          attributesWhitelist: {
            all: "style",
            input: "checked",
          },
          // minHeight: "700px",
          buttonList: [
            // Default
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
            // ['imageGallery'],
            ['fullScreen', 'showBlocks', 'codeView'],
            // ['preview', 'print'],
            // ['save', 'template'],
            // ['-left', '#fix', 'dir_ltr', 'dir_rtl'],
            // (min-width:992px)
           
          ],
          
        }}
      />
    </>
  );
};

export default CustomEditor;
