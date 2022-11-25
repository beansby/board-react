import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom'


function UpdateBoard(){

    const [writer, setWriter] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const {id} = useParams();
    
    
    useEffect(()=>{
        // `` 으로 링크 가져오기 : {id}로 사용하기 위해
        axios.get(`http://localhost:8090/boarddetail/${id}`)
        .then((response)=>{
            const board = response.data;
            setWriter(board.writer);
            setSubject(board.subject);
            setContent(board.content);
        }).catch((err)=>{
            console.log(err);
        }, [])
    }, []);

    const submit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8090/updateboard/${id}`, null, {params:{subject:subject, content:content}})
        .then((response) => {
            alert(response.data);
            // 등록시 목록 화면으로 이동
            document.location.href = '/';
        }).catch((err) => {
            console.log(err);
        })
    }

    // 함수 표현식 : 화살표 함수는 변수 취급
    const change_subject = (e) => {
        setSubject(e.target.value);
    }

    const change_content = (e) => {
        setContent(e.target.value);
    }


    return(
        <section>
            <h2> 게시글 수정 </h2>
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
                            <input type='text' name='subject' id='subject' value={subject} onChange={change_subject} />
                        </td>
                    </tr>

                    <tr>
                        <td className='td_left'>
                            <label for='content'>
                                내용
                            </label>
                        </td>
                        <td className='td_right'>
                            <textarea name='content' id='content' cols='40' rows='15' value={content} onChange={change_content} >
                            </textarea>
                        </td>
                    </tr>
                </table>

                <section id="commandCell">
                    {/* <a href='#'> 수정 </a>   */}
                    <button onClick={submit}> 저장 </button> 
                    {/* &nbsp; &nbsp;
                    <input type='reset' value='다시쓰기'/> */}
                </section>
            </form>
            
        </section>
    )
    

}

export default UpdateBoard;

