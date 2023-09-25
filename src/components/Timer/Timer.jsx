import React, { useEffect, useState } from 'react'
import './Timer.scss'
import IconPlay from './icon/play.svg'
const Timer = () => {

	const [value, setValue] = useState('')
	const [seconds, setSeconds] = useState('')
	const [isRunning, setIsRunning] = useState(false)
	const minute = String(Math.floor(seconds / 60)).padStart(2, '0')
	const second = String(seconds % 60).padStart(2, '0')

	useEffect(() => {
		const audioAlert = new Audio(
			'https://zvukitop.com/wp-content/uploads/2021/04/kogda-vremya-vyshlo-frfrc.mp3'
		)
		let timer
		if (isRunning && seconds > 0) {
			timer = setInterval(() => {
				setSeconds(s => s - 1)
			}, 1000)
		} else if (seconds < 0) {
			audioAlert.onplaying()
			clearInterval(timer)
		}
		return () => clearInterval(timer)
	}, [isRunning, seconds])

	const startTimer = () => {
		setSeconds(value * 60)
		setIsRunning(true)
	}
	document.title = `${minute} : ${second}`
	return (
		<div className='container'>
			<div className='wrapper'>
				<h1>Таймер</h1>
				<div className='timer'>
					<div className='timer__input'>
						<p>Установить таймер на</p>
						<input
							id='timer-input'
							type='number'
							step='0.01'
							value={value}
							onChange={e => setValue(e.target.value)}
						/>
						<p>минут</p>
					</div>
					<div className='timer__block'>
						<div id='min' className='num'>
							{minute}
						</div>
						<div id='dot' className='dot'>
							:
						</div>

						<div id='sec' className='num'>
							{second}
						</div>
					</div>
					<div className='timer__button'>
						<button id='timer-btn' onClick={startTimer}>
							<img src={IconPlay} alt='play' />
							Запустить таймер
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Timer
