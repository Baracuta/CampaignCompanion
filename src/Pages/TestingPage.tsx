import NavButton from "../components/NavButton"

//This is a page used for testing purposes.
function TestPage(){

    return((
        <div>

            <h1>Testing!</h1>
            <NavButton text="Go Home" destination="/"/>
            <NavButton text="Campaign List" destination="/campaign-list"/>
        </div>
    ))
}

export default TestPage