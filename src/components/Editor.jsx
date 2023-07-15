import React, { useRef, useState ,useEffect} from "react";
import dynamic from "next/dynamic";
import { toggolDialogue } from "../../slices/piblisherDialogueSlice";

import { useDispatch,useSelector } from "react-redux";
import { updateEditorContent } from "../../slices/editorSlice";
const SunEditor = dynamic(() => import("suneditor-react").then((a) => a), {
  ssr: false,
});
const buttonList = dynamic(() => import("suneditor-react").then((a) => a), {
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
} = dynamic(() => import("suneditor/src/plugins").then((a) => a), {
  ssr: false,
});

import styles from "../styles/Write.module.css";

const CustomEditor = () => {
  const [openDialogue, setOpenDialogue] = useState(false);
 
  const editor = useRef();

  const state = useSelector((state)=>  state)
  console.log(state)
const dispatch = useDispatch()
  function closeModal() {
    setOpenDialogue(false);
  }
  const getSunEditorInstance = (sunEditor) => {
    editor.current = sunEditor;
  };
  const handleRequest = () => {
    dispatch(updateEditorContent(editor.current.getContents()))
    dispatch(toggolDialogue(false))
    setOpenDialogue(true);
    // console.log(editor.current.getContents())
    // axios.post("http://localhost:3000/api/app", {
    //   data: editor.current.getContents()
    // })
    //   .then((response) => {
    //     console.log(response);
    //   });
  };

  return (
    <>
          <button
            onClick={() => {
              handleRequest();
            }}
          >
            Publish
          </button>
          <SunEditor
            className={styles["custom-suneditor"]}
            getSunEditorInstance={getSunEditorInstance}
            defaultValue="<h1 style=`text-align: center` >WRITE YOUR TITLE HERE....</h1>"
            // placeholder="<h1 style=`text-align: center` >WRITE YOUR TITLE HERE....</h1>"
            width="740px"
            height="auto"
            style={{ border: "2px solid green" }}
            autoFocus={true}
            // setAllPlugins={false}
            setOptions={{
              showPathLabel: false,
              allowedTags: "style",
              attributesWhitelist: {
                all: "style",
                input: "checked",
              },
              minHeight: "700px",
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
                // ['fullScreen', 'showBlocks', 'codeView'],
                // ['preview', 'print'],
                // ['save', 'template'],
                // ['-left', '#fix', 'dir_ltr', 'dir_rtl'],
                // (min-width:992px)
                [
                  "%992",
                  [
                    ["undo", "redo"],
                    [
                      ":p-More Paragraph-default.more_paragraph",
                      "font",
                      "fontSize",
                      "formatBlock",
                      "paragraphStyle",
                      "blockquote",
                    ],
                    ["bold", "underline", "italic", "strike"],
                    [
                      ":t-More Text-default.more_text",
                      "subscript",
                      "superscript",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                    ],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    ["align", "horizontalRule", "list", "lineHeight"],
                    ["-right", "dir"],
                    [
                      "-right",
                      ":i-More Misc-default.more_vertical",
                      "fullScreen",
                      "showBlocks",
                      "codeView",
                      "preview",
                      "print",
                      "save",
                      "template",
                    ],
                    // ['-right', ':r-More Rich-default.more_plus', 'table', 'link', 'image', 'video', 'audio',  'imageGallery']
                  ],
                ],
                // (min-width:768px)
                [
                  "%768",
                  [
                    ["undo", "redo"],
                    [
                      "paragraphStyle",
                      "blockquote",
                      "outdent",
                      "indent",
                      "align",
                      "horizontalRule",
                      "list",
                      "lineHeight",
                      "subscript",
                      "superscript",
                      "link",
                      "image",
                      "video",
                    ],
                    [
                      "font",
                      "fontSize",
                      "formatBlock",
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "fontColor",
                      "hiliteColor",
                      "textStyle",
                      "removeFormat",
                      "print",
                    ],
                    // [ 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'lineHeight'],
                    // [ 'table', 'link', 'image', 'video'],
                    // ['-right', 'dir'],
                    // ['-right', ':i-More Misc-default.more_vertical', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save', 'template']
                  ],
                ],
              ],
            }}
          />
        </>
     
  );
};

export default CustomEditor;
