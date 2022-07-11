
export default function Component() {
    const signIn = async () => {
        const res = await fetch('/api/auth/signin');
        const json = await res.json();

        //@ts-ignore
        window.location = json.authorizeUrl;
    }

    return (
        <div className="login-box">
			<a className="social-button" id="discog-connect" onClick={() => signIn()}> <span>Login with Discogs</span></a>
		</div>
    )
}
