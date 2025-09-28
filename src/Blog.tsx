import SyntaxHighlighter from 'react-syntax-highlighter';

export default function Blog() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className='text-5xl font-bold undeline'>
        whatHappens
      </h1>
      <br /><br />


      <h2 className='text-2xl text-gray-500'>
        When you click a button on a website
      </h2>
      <br /><br />

      <h3 className='text-2xl'>
        <p className='text-2l font-bold'>
          Assumptions<br /><br />
        </p>
        - M570 wireless Logitech mouse<br />
        - X86 CISC instruction set architecture<br />
        - Arch operating system<br />
        - Wayland display server<br />
        - Typescript<br />
        - React<br />
      </h3>
      <br /><br />

      <p className='text-2xl'>
        <p className='font-bold'>
          Prereq definitions<br /><br />
        </p>

        <p className='font-bold'>
          Lets get started<br /><br />
        </p>

        At the crust is React. React is a javascript library.<br /><br />

        Take a look at this bad boy<br /><br />

        <button
          onClick={() => { window.alert("Hello world!") }}
          className="bg-blue-500 hover:bg-blue-700 
                     text-white font-bold py-2 px-4 
                     rounded"
        >
          button
        </button>
        <br /><br />

        This is TSX, Typescript + <i>JSX</i>. JSX is a syntax extension to Javascript. With JSX, we can write html-like markup inside a javascript file. The button's code looks like this:
        <SyntaxHighlighter
          wrapLines={true}
          customStyle={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
          language="javascript">
          {`<button
  onClick={() => { window.alert("Hello world!") }}
  className="bg-blue-500 hover:bg-blue-700 
             text-white font-bold py-2 px-4 
             rounded"
>
  button
</button>
`
          }
        </SyntaxHighlighter>
        <br /><br />

        So, what exactly happens when we click that button?
        <br /><br />


        First thing that happens is you press your mouse's left-click. What you're actually *clicking* is a micro <i>switch</i>.<br />
        A switch is an component often found in a circuit. The switch takes in a current of electrons as input, and it can either stop said current from flowing through it, or divert it along some other path. When pressed, our micro switch redirects the flow of electrons from one wire to another for as long as it's held.

        <br /><br />Fun fact: I did some back of the napkin math, and every time you click your mouse (assuming 5V, 0.1s click, and 10,000 ohms), you're actually changing the physical trajectory of a about 206 TRILLION electrons. Isn't that crazy?
        <br /><br />
        *picture*
        <br /><br />

        {/* microswitch pressed */}

        The microswitch is soldered onto a printed circuit board (PCB); the green looking thing:
        <br /><br />
        *picture*
        <br /><br />

        On my particular pcb, i followed the darker looking lines connected to the mouse's left click button's micro switch. These lines are copper, and their technical names are "traces" *DOUBLE CHECK*. traces are the highway on which the power flows. The copper traces led me from the switch to a few capacitors, resistors, and eventually an <i>integrated circuit (IC)</i> labeled U4. This will be important later. But first, definitions!
        <br /><br />

        An integrated circuit (also called a chip or microchip) is same-same, but different than a PCB. Let me explain,
        <br /><br />

        Generally (frequently || often || usually || pls don't flame me):
        <br />
        <br />
        PCB: large visible electrical components (capacitor, resistor, transistors, diodes, potentially ram, potentially cache, etc) that live on an electical board... which has been printed.
        <br />
        <br />
        Integrated circuit: extremely tightly packed electrical components (capacitors, resistors, diodes, transistors, frequently ram, frequently cache, etc) that live on a semiconductor such as silicon. Technically speaking, ICs are considered to be "indivisible for the sake of construction and commerce(https://www.jedec.org/standards-documents/dictionary/terms/integrated-circuit-ic)". These guys are often so tightly packed that it's indiscernable to the human eye just what component is what (i cant stress enough how tightly packed these things are (https://www.youtube.com/watch?v=Fxv3JoS1uY8)).
        <br /><br />

        Examples of PCBs: your motherboard, the circuit board in your remote (probably), the circuit board in your keyboard (probably), circuit board in your toilet (i'm kidding... probably (https://www.youtube.com/watch?v=fMpddn0oXuQ)).
        <br />
        Examples of Integrated circuits: your CPU, your GPU, your RAM, and the tiny black box-looking component you'd find in any of the examples listed above (please don't take apart your toilet).
        <br /><br />


        The U4 Integrated Circuit on my Logitech mouse PCB is a <i>radio frequency (RF) module</i>. RF modules are tightly packed circuits which are defined by their responsibility: to trasmit or recieve radio waves between two or more devices.
        <br /><br />

        Given we're looking at a wireless mouse, finding something like this makes sense. RF modules come in a couple of flavors. The category we're dealing with is a <i>transceiver module</i>. A transreciever module is an RF module that both emits and recieves radio waves. Cool, so this enables two way communication of radio waves.
        <br /><br />

        But how are we going from streams of electrons on a copper wire to airborne radiowaves? And where and when exactly are we shooting these photons?
        <br /><br />

        RF modules are a neat little piece of tech, as is the rest of our PCB. But They need to be programmed. For example, how do we differentiate between a click and drag? What about double clicks?
        <br /><br />

        There is a second integrated circuit on our pcb, labeled U3. Admittedly, here I need to make an educated guess, since this component was not labeled on the PCB. I believe this is a <i>microcontroller</i>. A microcontroller is a tightly packed circuit on a silicon chip which contains atleast one CPU, memory, and tiny external metal <i>pins</i>. Pins on a micro controller handle input to and output from the microcontroller. My best guess is that when one of our pins is stimulated with a voltage, an <i>interrupt</i> happens.
        <br /><br />

        An interrupt is a signal to a CPU to execute some code as a response to some event. In our case, the event is our micro controller's pin detecting a change in voltage. I believe that when this code is executed, our microcontroller's CPU writes into a special register. When this register is written into, it triggers an output voltage from another one of our microcontroller's pins. This pin is connected to the RF module through the PCB's copper tracks. The RF module picks up the change in voltage on the track through one of its I/O devices. When this voltage is recognized, the RF module transmits a radio frequencey that is picked up by the USB Dongle, connected to our computer. This is, as i said, my best guess. There was no marking on the PCB for the U3 integrated circuit, so i had to fill in the gaps with the ol' hippcampus + pre-frontal cortex duo.
        <br /><br />

        The exact process of building the radio frequency is beyond the scope of this post. But it involves the technique of <i>signal modulation</i>. In short, signal modulation is a process where information is encoded on a radio wave. This is done by first taking a <i>carrier wave</i> such as a sine wave and encoding the byte stream onto it using fancy physics mathy magic. Yeah that's the most you're gonna get out of me for this one.
        <br /><br />

        Also, if you're interested, the RF module uses the following communication protocol to send packets to the USB dongle:
        <br /><br />

        https://docs.nordicsemi.com/bundle/ncs-latest/page/nrf/protocols/esb/index.html
        <br /><br />

        Our USB dongle receives these packets thanks to its own integrated circuit. Technically, the dongle's IC is a <i>system on a chip</i>. A system on a chip is... a quite ill-defined thing indeed. It's functionally <strong>very</strong> similar to a microcontroller. Just like a micro contoller, a system on a chip is an integrated circuit that involes a myriad of electronic components such as CPU(s), memory, input/output, and basic circuit devices like resistors, capacitors, diodes, and more.
        <br /><br />

        But unlike micro controllers, a system on a chip is more complex, expensive, and powerful. It might contain a whole operating system, storage, individual micro controllers, GPU(s), etc. Basically, a system on a chip is often, functionally, a whole computer. Whereas micro controllers are often, functionally, a low power, simpler device for handling i/o and some less-complex logic between components on some circuit. Your phone probably has a system on a chip.
        <br /><br />

        Our system on a chip has a couple components worth mentioning. It has an (enhanced) single core 8501 cpu and an RF transciever module. According to the chip's documentation, the 8501 CPU allots the transciever two interrupts: RFERR (for errors) and RF (for normal operations) interrupt. When the transciever finishes recieving the airborne bytestreaming communicating a left mouse click, a microcontroller workking in tandem with the RF module (but separate from the CPU) sparks a chain of events.
        <br /><br />





        {/*TODO: OS Kernel -> compositor */}

        {/*TODO: Compositor -> firefox */}

        {/*TODO: firefox event generates */}

        First, the code inside the "onClick" gets executed. This code could have been anything, but I chose a basic alert box for the sake of simplicity.
        <br /><br />

        Soooo, let's run with it!
        <br /><br />

        Alert is a function and a method associated with the <i>window</i> object. The window object exposes the Window interface. This interface also allows us to interact with the <i>document</i> object through window.document property.
        <br /><br />

        The document object exposes the Document interface, which is an entry point to the <i>Document Object Model (DOM) </i>Tree. The DOM is an API for interacting with the "document" which is an in-memory <i>representation</i> of the HTML code rendered on web pages.
        <br /><br />

        This representation is a tree, where each node represents an element of our HTML (i.e, {`<head>, <body>, <a href=blah>, <p>`}, etc.). Both the Window and Document interface abide by the WebIDL standard
        <br /><br />

        https://webidl.spec.whatwg.org/
        <br /><br />

        WebIDL is a common standard for defining interfaces on modern browsers.
        <br /><br />


        Phew, that got really abstract really fast. Did I lose you?
        <br /><br />

        <p className='font-bold'>
          Let's look at some code
        </p>
        <br />


        In the Firefox source code (sep2025), the exact entrypoint function executed when we click our button is in the dom/base/nsGlobalWindowInner c++ file. Here is the source.
        <br /><br />
        https://github.com/mozilla-firefox/firefox/blob/main/dom/base/nsGlobalWindowInner.cpp#L3718
        <br /><br />
        This is what it looks like
        <br /><br />
        <SyntaxHighlighter
          wrapLines={true}
          customStyle={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
          language="cpp">
          {`void nsGlobalWindowInner::Alert(const nsAString& aMessage,
                                nsIPrincipal& aSubjectPrincipal,
                                ErrorResult& aError) {
  FORWARD_TO_OUTER_OR_THROW(AlertOuter, (aMessage, aSubjectPrincipal, aError),
                            aError, );
}
`}
        </SyntaxHighlighter>
        <br />

        The function takes in 3 references to 3 variables, with the aMessage (our "Hello world!") being read-only. The 3 references are passed into the FORWARD_TO_OUTER_OR_THROW macro which looks like this<br /><br />

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
        <br />

        This macro takes in a method (AlertOuter from the previous function) and executes said method with the following arguments: aMessage, aSubjectPrincipal, aError.
        <br /><br />

        The method is executed within the context of the <i>outer window</i>. Interestingly, in Firefox, a separation of concerns exists between the inner window (nsGlobalWindowInner class) and outer window (nsGlobalWindowOuter class).
        <br /><br />

        The inner window is the Window interface described above, enabling developers to interact with the Document interface and therefore the DOM. The outer window is Mozilla's spin on the <i>windowproxy</i>.
        <br /><br />

        The window proxy is an object which wraps the window object. Its purpose is to serve as a proxy and security boundrary for the window object. It is necessary to introduce this wrapper around the window object to ensure important security features within the modern browser, such as CORS.
        <br /><br />

        The window proxy is persistent to a <i>browsing context</i>, the window may, however, change. A browsing context is one or more Document objects and one or more <i>views</i>. A view is what you're looking at... more or less.
        <br /><br />

        <p className='font-bold'>
          Anyways...
        </p>
        <br />

        The AlertOuter method looks like this
        <br />
        <br />
        <SyntaxHighlighter language="cpp">
          {`void nsGlobalWindowOuter::AlertOuter(const nsAString& aMessage,
                                     nsIPrincipal& aSubjectPrincipal,
                                     ErrorResult& aError) {
  AlertOrConfirm(/* aAlert = */ true, aMessage, aSubjectPrincipal, aError);
}
`}
        </SyntaxHighlighter>
        <br />

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
        <br />
        <br />
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
    // library to draw up the popup. It's considered a widget and lives in:
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

        <br />

        {/*TODO: GTK*/}
        On the linux operating system, the following emacscript
      </p>


    </div >

  )
}





