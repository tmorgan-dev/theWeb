import { useRouteError } from 'react-router-dom';

function Error() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id='error-page'>
			<h1>Uh ooooh!</h1>
			<p>Uh oh, you broke it!</p>
			<p>
				<i>{error.statusText || error.message}</i>
			</p>
		</div>
	);
}
export default Error;
