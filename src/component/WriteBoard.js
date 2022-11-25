import {Component} from 'react';
import './WriteBoard.css';
import axios from 'axios';

class WriteBoard extends Component {

    constructor(props){
        super(props);
        this.state = {
            writer : '',
            password : '',
            subject : '',
            content : '',
            file : null,

        }
    }

    change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]:value});
    }

    submit = (e) => {
        // form 태그 안에 있기 때문에 submit 기능을 막아주는 것이 필요
        e.preventDefault();
        // JS제공 객체 : FormData
        const formData = new FormData();
        // key , value 형태
        formData.append('writer', this.state.writer);
        formData.append('password', this.state.password);
        formData.append('subject', this.state.subject);
        formData.append('content', this.state.content);
        formData.append('file', this.state.file);

        // const config = {
        //     headers : {
        //         'content-type' : 'multipart/form-data'  //반드시 컨텐트 타입 설정은 멀티파트로 해야 함
        //     }
        // }

        axios.post('http://localhost:8090/writeboard2', formData)
        .then((response) => {
            alert(response.data);
            // 등록시 목록 화면으로 이동
            document.location.href = '/';
        }).catch((err) => {

        })
    }

    fileChange = (e) => {
        // 멀티파일이 가능?
        this.setState({file : e.target.files[0]})
    }

    render(){
        return(
            <section>
                <h2> 게시글 작성 </h2>
                <form>
                    <table>
                        <tr>
                            <td className='td_left'>
                                <label for='writer'>
                                    글쓴이
                                </label>
                            </td>
                            <td className='td_right'>
                                <input type='text' name='writer' id='writer' value={this.state.writer} onChange={this.change}/> 
                            </td>
                        </tr>

                        <tr>
                            <td className='td_left'>
                                <label for='password'>
                                    비밀번호
                                </label>
                            </td>
                            <td className='td_right'>
                                <input type='password' name='password' id='password' value={this.state.password} onChange={this.change}/> 
                            </td>
                        </tr>

                        <tr>
                            <td className='td_left'>
                                <label for='subject'>
                                    제목
                                </label>
                            </td>
                            <td className='td_right'>
                                <input type='text' name='subject' id='subject' value={this.state.subject} onChange={this.change}/>
                            </td>
                        </tr>

                        <tr>
                            <td className='td_left'>
                                <label for='content'>
                                    내용
                                </label>
                            </td>
                            <td className='td_right'>
                                <textarea name='content' id='content' cols='40' rows='15' value={this.state.content} onChange={this.change}>
                                </textarea>
                            </td>
                        </tr>

                        <tr>
                            <td className='td_left'>
                                <label for='file'>
                                    파일첨부
                                </label>
                            </td>
                            <td className='td_right'>
                                {/* file은 value대신 함수로 변수 연동 */}
                                <input type='file' name='file' id='file' onChange={this.fileChange} accept='image/*'/>
                            </td>
                        </tr>
                    </table>

                    <section id="commandCell">
                        <button onClick={this.submit}> 등록 </button> 
                        &nbsp; &nbsp;
                        <input type='reset' value='다시쓰기'/>
                    </section>
                </form>
                
            </section>
        )
    }
}

export default WriteBoard;

