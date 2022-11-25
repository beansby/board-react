import React from 'react';
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';

function Header() {

    const {id} = useParams();

    return(
        <div>
            <ul className="nav-items">
                <li className="nav-item">
                    <Link to={'/'} > 홈 </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/write'}> 글 작성 </Link>
                </li>
                <li className="nav-item">
                    <Link to={`/detail2/${id}`}> 글 상세 </Link>
                </li>

            </ul>
        </div>    
    )
}


export default Header;
