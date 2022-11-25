import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import './WriteBoard.css';
import axios from 'axios';

function DetailBoardFunc() {

    const [writer, setWriter] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    // class component에서 사용할 수 없음 
    // 객체일 때 전개하는 방법 : 객체로 가져옴 {}
    // Route path :id  => 명칭이 반드시 일치해야함
    const {id} = useParams();
    

    useEffect(()=>{
        // `` 으로 링크 가져오기 : {id}로 사용하기 위해
        axios.get(`http://localhost:8090/boarddetail/${id}`)
        .then((response)=>{
            const board = response.data;
            setWriter(board.writer);
            setSubject(board.subject);
            setContent(board.content);
            setImgUrl('http://localhost:8090/img/'+board.filename);
        }).catch((err)=>{
            console.log(err);
        })
    }, []);

    return(
        <section>
            <h2> 게시글 상세 </h2>
            <form>
                <table>
                    <tr>
                        <td className='td_left'>
                            <label for='id'>
                                글 번호
                            </label>
                        </td>
                        <td className='td_right'>
                            <input type='text' name='id' id='id' value={id} readOnly/> 
                        </td>
                    </tr>

                    <tr>
                        <td className='td_left'>
                            <label for='writer'>
                                글쓴이
                            </label>
                        </td>
                        <td className='td_right'>
                            <input type='text' name='writer' id='writer' value={writer} readOnly/> 
                        </td>
                    </tr>

                    <tr>
                        <td className='td_left'>
                            <label for='subject'>
                                제목
                            </label>
                        </td>
                        <td className='td_right'>
                            <input type='text' name='subject' id='subject' value={subject} readOnly/>
                        </td>
                    </tr>

                    <tr>
                        <td className='td_left'>
                            <label for='content'>
                                내용
                            </label>
                        </td>
                        <td className='td_right'>
                            <textarea name='content' id='content' cols='40' rows='15' value={content} readOnly>
                            </textarea>
                        </td>
                    </tr>

                    <tr>
                        <td className='td_left'>
                            <label for='file'>
                                이미지
                            </label>
                        </td>
                        <td className='td_right'>
                            <img src={imgUrl} alt='' width="300px"/> 
                        </td>
                    </tr>
                </table>

                <section id="commandCell">
                    <a href={'/update/'+id}> 수정 </a>  

                    {/* <Link to={'/update'}> 수정 </Link>  */}
                    &nbsp; &nbsp;
                    <a href='#'> 삭제 </a>
                </section>
            </form>
            
        </section>
    )
    
}

export default DetailBoardFunc;
