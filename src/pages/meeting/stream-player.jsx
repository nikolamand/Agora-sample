import React, { useMemo, useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useGlobalState } from '../../utils/container'

StreamPlayer.propTypes = {
  stream: PropTypes.object
}

export default function StreamPlayer (props) {
  const { stream, domId, uid } = props

  const [resume, changeResume] = useState(false)

  const [autoplay, changeAutoplay] = useState(false)

  const stateCtx = useGlobalState()

  const handleClick = () => {
    if (autoplay && !resume) {
      stream.resume()
      changeResume(true)
    }
  }

  const handleDoubleClick = (evt) => {
    evt.stopPropagation()
    props.onDoubleClick(stream)
  }

  const [state, setState] = useState({
    accessDelay: 0,
    fps: 0,
    resolution: 0
  })

  const analytics = useMemo(() => state, [state])

  useEffect(() => {
    const timer = setInterval(() => {
      stream.getStats((stats) => {
        const width = props.local
          ? stats.videoSendResolutionWidth
          : stats.videoReceiveResolutionWidth
        const height = props.local
          ? stats.videoSendResolutionHeight
          : stats.videoReceiveResolutionHeight
        const fps = props.local
          ? stats.videoSendFrameRate
          : stats.videoReceiveFrameRate
        setState({
          accessDelay: `${stats.accessDelay ? stats.accessDelay : 0}`,
          resolution: `${width}x${height}`,
          fps: `${fps || 0}`
        })
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [props.local, stream])

  const lockPlay = React.useRef(false)

  useEffect(() => {
    if (!stream || stream.isPlaying()) return
    lockPlay.current = true
    stream.play(domId, { fit: 'cover' }, (errState) => {
      if (errState && errState.status !== 'aborted') {
        console.log('stream-player play failed ', domId)
        changeAutoplay(true)
      }
      lockPlay.current = false
    })
    return () => {
      if (stream.isPlaying()) {
        stream.stop()
      }
    }
  }, [stream, domId])

  const streamUid = useRef(null)
  useEffect(() => {
    if (stateCtx.activeSpeaker && streamUid.current) {
      if (streamUid.current.id === `stream-${stateCtx.activeSpeaker.uid}`) { streamUid.current.classList.add('active-speaker') } else { streamUid.current.classList.remove('active-speaker') }
    }
  }, [stateCtx.activeSpeaker])

  return (
    <div
      className={`stream-player ${autoplay ? 'autoplay' : ''}`}
      id={domId}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {props.children}
      {props.showProfile ? (
        <div className={props.className}>
          <span>SD-RTN delay: {analytics.accessDelay}ms</span>
          <span>
            Video: {analytics.fps}fps {analytics.resolution}
          </span>
        </div>
      ) : null}
      {props.showUid && uid ? (
        <div className="stream-uid" id={`stream-${uid}`} ref={streamUid}>UID: {uid}</div>
      ) : null}
    </div>
  )
}
