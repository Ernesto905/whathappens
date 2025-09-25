import SyntaxHighlighter from 'react-syntax-highlighter';

export default function Blog() {
  return (
    <div>
      <h1 className='text-3l font-bold undeline'>
        whatHappens
      </h1>


      <h2>
        When you click a button on a website
      </h2>

      <h3>
        Assumptions
        - X86 CISC Instruction Set Architecture
        - Arch Operating System
        - Typescript
        - React
      </h3>

      <p>
        At the crust of the onion is React. React is a library...<br /><br />

        Actually, on that note, lets get some definitions out of the way.<br /><br />

        A library is a collection of <i>resources</i> which programmers include in their <i>programs</i> so as to not reinvent the wheel.<br /><br />

        At the level of abstraction of react, these resources are the human readable source code that we "import".
        In a compiled language, these resources are often precompiled object files.

        Programs are a collection of <i>instructions</i> that computers interpret to perform actions.<br /><br />

        These instructions may be represented at different levels of abstraction.<br /><br />

        From human readable C code
        <SyntaxHighlighter language="c">
          {`#include <stdio.h>
int main() {
  printf("Hello world!");
  return 0;
}`
          }
        </SyntaxHighlighter><br /><br />

        to a less readable hexadecimals representation of the machine code (peep the 2nd to 5th column below)
        <SyntaxHighlighter language="text">
          {`$ objdump -s -j .text main

main:     file format elf64-x86-64

Contents of section .text:
1040 f30f1efa 31ed4989 d15e4889 e24883e4  ....1.I..^H..H..
1050 f0505445 31c031c9 488d3dda 000000ff  .PTE1.1.H.=.....
1060 155b2f00 00f4662e 0f1f8400 00000000  .[/...f.........
1070 488d3da1 2f000048 8d059a2f 00004839  H.=./..H.../..H9
1080 f8741548 8b053e2f 00004885 c07409ff  .t.H..>/..H..t..
1090 e00f1f80 00000000 c30f1f80 00000000  ................
10a0 488d3d71 2f000048 8d356a2f 00004829  H.=q/..H.5j/..H)
10b0 fe4889f0 48c1ee3f 48c1f803 4801c648  .H..H..?H...H..H
10c0 d1fe7414 488b050d 2f000048 85c07408  ..t.H.../..H..t.
10d0 ffe0660f 1f440000 c30f1f80 00000000  ..f..D..........
10e0 f30f1efa 803d2d2f 00000075 33554883  .....=-/...u3UH.
10f0 3dea2e00 00004889 e5740d48 8b3d0e2f  =.....H..t.H.=./
1100 0000ff15 d82e0000 e863ffff ffc60504  .........c......
1110 2f000001 5dc3662e 0f1f8400 00000000  /...].f.........
1120 c30f1f40 0066662e 0f1f8400 00000000  ...@.ff.........
1130 f30f1efa e967ffff ff554889 e5488d05  .....g...UH..H..
1140 c00e0000 4889c7b8 00000000 e8dffeff  ....H...........
1150 ffb80000 00005dc3                    ......].`}
        </SyntaxHighlighter><br /><br />


        Now, back to buttons. Take a look at this bad boy<br /><br />

        <button
          onClick={() => { window.alert("Hello world!") }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          button
        </button>
        <br /><br />

        Its code looks like this:
        <SyntaxHighlighter language="javascript">
          {`<button onClick={() => { window.alert("Hello world!") }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
  button
</button>`
          }
        </SyntaxHighlighter>
        <br /><br />

        So, what exactly happens when we click that button?
        <br /><br />

        First, the code inside the "onClick" gets executed. This code could have been anything, but I chose a basic alert box for the sake of simplicity.
        <br /><br />

        Soooo, let's run with it!
        <br /><br />

        Alert is a function and a method associated with the <i>window</i> object. The window object exposes the Window interface. This interface also allows us to interact with the <i>document</i> object through window.document property.

        The document object exposes the Document interface, which is an entry point to the <i>Document Object Model (DOM) </i>Tree. The DOM is an API for interacting with the "document" which is an in-memory <i>representation</i> of the HTML code rendered on web pages. This representation is a tree, where each node represents an element of our HTML (i.e, {`<head>, <body>, <a href=blah>, <p>`}, etc.). Both the Window and Document interface abide by the WebIDL standard

        https://webidl.spec.whatwg.org/

        , a common standard for defining interfaces on modern browser.
        <br /><br />


        Phew, that got really abstract really fast. Did I lose you? Let's look at some code:
        <br /><br />


        In the Firefox source code (sep2025), the exact entrypoint function executed when we click our button is in the dom/base/nsGlobalWindowInner c++ file. Here is the source.
        <br /><br />
        https://github.com/mozilla-firefox/firefox/blob/main/dom/base/nsGlobalWindowInner.cpp#L3718
        <br /><br />
        This is what it looks like
        <br /><br />
        <SyntaxHighlighter language="cpp">
          {`void nsGlobalWindowInner::Alert(const nsAString& aMessage,
                                nsIPrincipal& aSubjectPrincipal,
                                ErrorResult& aError) {
  FORWARD_TO_OUTER_OR_THROW(AlertOuter, (aMessage, aSubjectPrincipal, aError),
                            aError, );
}
`}
        </SyntaxHighlighter>

        The function takes in 3 references to 3 variables, with the aMessage (our "Hello world!") being read-only. The 3 references are passed into the FORWARD_TO_OUTER_OR_THROW macro which looks like this

        <SyntaxHighlighter language="cpp">
          {`#define FORWARD_TO_OUTER_OR_THROW(method, args, rv, err_rval)                
  PR_BEGIN_MACRO                                                             \\
  RefPtr<nsGlobalWindowOuter> outer = GetOuterWindowForForwarding(this, rv); \\
  if (MOZ_LIKELY(outer)) {                                                   \\
    return outer->method args;                                               \\
  }                                                                          \\
  return err_rval;                                                           \\
  PR_END_MACRO`}
        </SyntaxHighlighter>

        This macro takes in a method (AlertOuter from the previous function) and executes said method with the following arguments: aMessage, aSubjectPrincipal, aError.
        <br /><br />

        The method is executed within the context of the <i>outer window</i>. Interestingly, in Firefox, a separation of concerns exists between the inner window (nsGlobalWindowInner class) and outer window (nsGlobalWindowOuter class). The inner window is the Window interface described above, enabling developers to interact with the Document interface and therefore the DOM. The outer window is Mozilla's spin on the <i>windowproxy</i>. The window proxy is an object which wraps the window object. Its purpose is to serve as a proxy and security boundrary for the window object. It is necessary to introduce this wrapper around the window object to ensure important security features within the modern browser, such as CORS. The window proxy is persistent to a <i>browsing context</i>, the window may, however, change. A browsing context is one or more Document objects and one or more <i>views</i>. A view is what you're looking at... more or less.
        <br /><br />

        Anyways...
        <br /><br />


        The AlertOuter method looks like this:
        <SyntaxHighlighter language="cpp">
          {`void nsGlobalWindowOuter::AlertOuter(const nsAString& aMessage,
                                     nsIPrincipal& aSubjectPrincipal,
                                     ErrorResult& aError) {
  AlertOrConfirm(/* aAlert = */ true, aMessage, aSubjectPrincipal, aError);
}
`}
        </SyntaxHighlighter>

        Within, we execute AlertOrConfirm which is where most of the heavy lifting is. This function also handles prompts which are alert... actually just take a look
        <br /><br />

        <button
          onClick={() => { window.prompt("I am a window.prompt!") }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          button
        </button>
        <br /><br />

        I took the liberty of adding some comments.
        <SyntaxHighlighter language="cpp">
          {`bool nsGlobalWindowOuter::AlertOrConfirm(bool aAlert, const nsAString &aMessage,
                                         nsIPrincipal &aSubjectPrincipal,
                                         ErrorResult &aError) {
  if (!AreDialogsEnabled()) {
    return false;
  }

  // flag indicating a popup is being opened
  AutoPopupStatePusher popupStatePusher(PopupBlocker::openAbused, true);

  EnsureReflowFlushAndPaint();

  nsAutoString title;
  MakeMessageWithPrincipal(title, &aSubjectPrincipal, false,
                           "ScriptDlgNullPrincipalHeading", "ScriptDlgHeading",
                           "ScriptDlgGenericHeading");

  // Sanitize alert message for security and rendering issues and places the
  // sanitized message inside a "final" variable
  nsAutoString final;
  nsContentUtils::StripNullChars(aMessage, final);
  nsContentUtils::PlatformToDOMLineBreaks(final);

  /*
   * A lot is happening here. Behind the scenes, firefox is employing a factory
   * pattern to construct our prompt based on the platform (i.e, linux, mac,
   * windows, mobile, etc.). This is specific to Mozilla's XPCOM architecture.
   *
   */
  nsresult rv;
  nsCOMPtr<nsIPromptFactory> promptFac =
      do_GetService("@mozilla.org/prompter;1", &rv);
  if (NS_FAILED(rv)) {
    aError.Throw(rv);
    return false;
  }

  /*
   * Note this is an nsIPrompt, which can best be
   * thought of as a generic dialogue box, used for both window.alert and
   * window.prompt.
   */
  nsCOMPtr<nsIPrompt> prompt;

  aError =
      promptFac->GetPrompt(this, NS_GET_IID(nsIPrompt), getter_AddRefs(prompt));

  if (aError.Failed()) {
    return false;
  }

  // honestly, i'm not really sure what this does. I dont know everything, man.
  if (nsCOMPtr<nsIWritablePropertyBag2> promptBag = do_QueryInterface(prompt)) {
    promptBag->SetPropertyAsUint32(u"modalType"_ns,
                                   nsIPrompt::MODAL_TYPE_CONTENT);
  }

  bool result = false; // not used for window.alert()

  // Again, unsure. I'd guess it prevents the user from performing certain
  // actions on the webpage while the popup is active
  nsAutoSyncOperation sync(mDoc, SyncOperationBehavior::eSuspendInput);

  if (ShouldPromptToBlockDialogs()) { // "¿ Don't allow localhost:5173 to prompt
                                      // you again"
    bool disallowDialog = false;
    nsAutoString label;

    MakeMessageWithPrincipal(
        label, &aSubjectPrincipal, true, "ScriptDialogLabelNullPrincipal",
        "ScriptDialogLabelContentPrincipal", "ScriptDialogLabelNullPrincipal");

    // Here is the boundary. The AlertCheck interface performs a
    // handoff to the program responsible for drawing and rendering the alert
    // popup on the screen. In our case, it would be GTK. Firefox uses the GTK
    // library to draw up and the popup. It's considered a widget and lives in:
    // https://github.com/mozilla-firefox/firefox/tree/main/widget/gtk
    aError = aAlert
                 ? prompt->AlertCheck(title.get(), final.get(), label.get(),
                                      &disallowDialog)
                 : prompt->ConfirmCheck(title.get(), final.get(), label.get(),
                                        &disallowDialog, &result);

    if (disallowDialog) { // You checked the box, didn't you?
      DisableDialogs();
    }
  } else {
    aError = aAlert ? prompt->Alert(title.get(), final.get())
                    : prompt->Confirm(title.get(), final.get(), &result);
  }

  return result;
}
`}
        </SyntaxHighlighter>
      </p>


    </div >

  )
}




                  
