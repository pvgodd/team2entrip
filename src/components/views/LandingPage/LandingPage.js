import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
//import Item from 'antd/lib/list/Item';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([])


    //몽고db 영상 가져오기
    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setVideo(response.data.videos)

                } else {
                    alert('비디오 몽고db 불러오기 실패!')
                }
            })
    }, [])

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24}>
            {/* id를 이용해 비디오 링크 걸어둠 */}
            <a href={`/video/${video._id}`} >
                <div style={{ position: 'relative' }}>
                    <img style={{ width: '100%' }} alt="thumbnail" src={`http://localhost:5000/${video.thumbnail}`} />
                    <div className="duration"
                        style={{
                            bottom: 0, right: 0, position: 'absolute', margin: '4px',
                            color: '#fff', backgroundColor: 'rgba(17, 17, 17, 0.8)', opacity: 0.8,
                            padding: '2px 4px', borderRadius: '2px', letterSpacing: '0.5px', fontSize: '12px',
                            fontWeight: '500', lineHeight: '12px'
                        }}
                    >
                        <span>{minutes} : {seconds}</span>
                    </div>
                </div>
            </a>
            <br />
            <Meta
                avatar={
                    //Avatar 올린 사람의 이미지
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
                description=""
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views} views</span> - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>
    })
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}>Recommend</Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCards}

            </Row>
        </div>
    )
}

export default LandingPage
