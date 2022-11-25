import {useState, useEffect} from 'react';
import axios from 'axios';
import './ListBoard.css'
import {Link} from 'react-router-dom'


function ListBoard(){

    const [boards, setBoards] = useState([]);   //변수가 배열

    useEffect(()=> {
        axios.get('http://localhost:8090/boardlist')
        .then((response)=>{
            setBoards(response.data);
        }).catch((err)=>{
            console.log(err);
        })
    }, []);


    return(
        <>        
            <h2> 
                글 목록 <Link to={'/write'}> 게시판 글쓰기 </Link>  
            </h2>
            <section>
                <table className='table_list'>
                    <tbody>
                        <tr id='tr_top'>
                            <th> 번호 </th>
                            <th> 작성자 </th>
                            <th> 제목 </th>
                        </tr>

                        {
                            boards.map((board)=>(
                                <tr key={board.id}>
                                    <td> <Link to={`detail2/${board.id}`}> {board.id} </Link> </td>
                                    <td> {board.writer} </td>
                                    <td> <Link to={`detail2/${board.id}`}> {board.subject} </Link> </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </section>
        </>

    )
}

export default ListBoard;