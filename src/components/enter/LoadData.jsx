
'use client'

import { useEffect, useState } from 'react';
import { getAuthorData } from '@/utlis/appClientAPI ';
import InitializeWait from '../InitializeWait';
import EnterButton from './EnterButton';
import FailedMessage from '../FailedMessage';


export default function LoadData() {
    const [data, setData] = useState('');

    const fetchAuthorInfo = async () => {
        const authorData = await getAuthorData();
        setData(authorData);
    }

    useEffect(() => {
        fetchAuthorInfo();
    }, [])


    return <>
        {
            data === '' && <InitializeWait message={'加载中…'} />
        }
        {
            data === false && <FailedMessage message={'阅读权限被作者关闭，请联系作者了解详情'} />
        }
        {
            data.safe && <EnterButton authorData={data} />
        }
    </>

}