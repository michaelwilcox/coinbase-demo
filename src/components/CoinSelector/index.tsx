import React, { useEffect, useState } from 'react';
import { ENDPOINTS } from '../../constants';
// import { useConnection } from '../../contexts/connection';

import {  Input, AutoComplete  } from 'antd';
import {  UserOutlined  } from '@ant-design/icons';

interface Option {
    name: string,
    value: string,
    label: JSX.Element
}

interface Options {
    label: JSX.Element,
    options: Array<Option>
}

export const CoinSelector = () => {
    const [value, setValue] = useState('');
    const [initialOptions, setInitialOptions] = useState<Array<Options>>([]);
    const [options, setOptions] = useState<Array<Options>>([]);
    // const connection = useConnection();

    const renderTitle = (title: string) => (
        <span>
          {title}
          <a
            style={{
              float: 'right',
            }}
            href="https://www.google.com/search?q=antd"
            target="_blank"
            rel="noopener noreferrer"
          >
            more
          </a>
        </span>
      );
      
    const renderItem = (ticker: string, name: string): Option => ({
        name,
        value: ticker,
        label: (
            <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
            }}
            >
            {ticker}
            <span>
                <UserOutlined /> {name}
            </span>
            </div>
        ),
    });

    const onBlur = () => {
        setOptions(initialOptions)
    }

    const onChange = (data: string) => {
        setValue(data);
    };

    const onSearch = (searchText: string) => {
        searchText = searchText.toLowerCase();

        if (!searchText) {
            // restore list
            setOptions(initialOptions);
            return;
        }

        const filtered = options.map(({ label, options }) => ({
            label,
            options: options.filter(o =>
                o.name.toLowerCase().includes(searchText) || 
                o.value.toLowerCase().includes(searchText)
            )
        }));
        setOptions(filtered);
    }

    const onSelect = (selection: string) => {
        // TODO: apply to global context
        console.log(selection);
        setValue('');
        setOptions(initialOptions);
    }
      
    useEffect(() => {
        async function getCoins() {
            const currencies = await fetch(ENDPOINTS.CURRENCIES).then(res => res.json());
            return currencies
                    .filter((c: any) => c.details.type === 'crypto')
                    .sort((a: any, b: any) => a.id.localeCompare(b.id))
        }
        getCoins().then((coins) => {
            const options = coins.map((coin: any) => {
                return renderItem(coin.id, coin.name)
            });

            const option = { label: renderTitle('Crypto'), options }

            setInitialOptions([option])
            setOptions([option])
        });
    }, [])

    return (
        <AutoComplete
            dropdownClassName="certain-category-search-dropdown"
            dropdownMatchSelectWidth={500}
            style={{
            width: 250,
            }}
            options={options}
            onBlur={onBlur}
            onChange={onChange}
            onSearch={onSearch}
            onSelect={onSelect}
            value={value}
        >
            <Input.Search size="large" placeholder="input here" />
        </AutoComplete>
    );
}