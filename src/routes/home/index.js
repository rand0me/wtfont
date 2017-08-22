import { h, Component } from 'preact';
import style from './style';

const initialState = {
	text: '',
	size: 30,
	font: 'Ubuntu',
	color: '#f00'
}

export default class Home extends Component {
	render(props, { text, size, font, color } = initialState) {
		if (props.canvas) this.updateCanvas();
		return (
			<div class={style.home}>
				<h1>Home</h1>
				<input type="number" value={ size } onInput={ ({ target }) => this.setState({ size: target.value })} />
				<input type="text" onInput={ e => this.setState({ text: e.target.value.toUpperCase() }) }/>
				<canvas class={style.canvas} ref={ el => props.canvas = el }></canvas>
				<img src={ `${ this.props.canvas && this.props.canvas.toDataURL() }` } />
				<button onClick={ () => this.share() }>Послать</button>
			</div>
		);
	}

	share() {
		location.href = this.props.canvas.toDataURL();
	}

	updateCanvas() {
		const { width, height } = this.props.canvas;
		const ctx = this.props.canvas.getContext('2d');
		const { size, font, text, color } = this.state;
		ctx.clearRect(0, 0, width, height);
		ctx.fillStyle = "#cccccc";
		ctx.font = `${size}px ${font}`;
		ctx.fillText(this.state.text, 30, 30);
	}
}
