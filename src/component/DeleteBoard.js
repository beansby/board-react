import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import './DeleteBoard.css';

function DeleteBoard() {
    const [password, setPassword] = useState('');
    const {id} = useParams();

    const submit = (e) => {
        axios.put(`http://localhost:8090/deleteboard/${id}`, null, {params:{password:password}})
        .then((response)=>{
            const res_no = response.data;
            if (res_no == -1) {
                alert('글 번호 오류')
            } else if (res_no == -2) {
                alert ('비밀번호 오류')
            } else if (res_no == 0) {
                alert ('글 삭제 성공')
                document.location.href = '/';
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <section id='passForm'>
            <table>
                <tr>
                    <td>
                        <label> 글 비밀번호 </label>
                    </td>
                    <td>
                        <input type='password' name='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    </td>
                </tr>
                
                <tr>
                    <td></td>
                    <td>
                        <button onClick={submit}> 삭제 </button> &nbsp; &nbsp;
                        <button onClick={"javascript:history.go(-1)"}> 취소 </button>
                    </td>
                </tr>

            </table>
        </section>

    )
}

export default DeleteBoard;