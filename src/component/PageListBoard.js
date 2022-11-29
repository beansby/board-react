import {useState, useEffect} from 'react';
import axios from 'axios';
import './ListBoard.css'
import {Link} from 'react-router-dom'


function PageListBoard(){

    const [boards, setBoards] = useState([]); 

    const [pageInfo, setPageInfo] = useState({
        allPage : 0,
        curPage : 0,
        startPage : 0,
        endPage : 0
    });

    useEffect(()=> {
        serverRequest(1);
    }, []);

    const pageRequest = (e) => {
        serverRequest(e.target.value);
    }

    const serverRequest = (page) => {
        axios.get("http://localhost:8090/page/"+page)
        .then(response => {
            console.log(response.data.pageInfo);
            setPageInfo(response.data.pageInfo);
            setBoards(response.data.boards);
        }).catch(err => {
            console.log(err);
        })
    }


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
            <br/>
            <section id='pageList'>
                {(() => {
                    const array = [];
                    for (let i = pageInfo.startPage; i<= pageInfo.endPage; i++){
                        array.push(
                            <span key={i}>
                                <button value={i} onClick={pageRequest}> {i} </button>
                                &nbsp; &nbsp;
                            </span>
                        )
                    }
                    return array;
                })()

                }
            </section>
        </>

    )
}

export default PageListBoard;