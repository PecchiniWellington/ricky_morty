import React, { useState } from 'react'
import { PrevNextPage } from './pagination.constants';
import { IPageControl } from './pagination.interfaces';

import './pagination.style.css'
import { ICharacterInfo } from '../../components/characters/character.interfaces';

type Props = {
  infos: ICharacterInfo,
  limit: number,
  sendPage: (p: number) => void;
  active: string | number
}

const Pagination = ({ infos, limit = 0, sendPage, active = 1 }: Props) => {
  const [offs, setOffset] = useState<number>(0)
  const { pages } = infos;

  const arrRange = (tot: number, m: number) => {
    let min = m;
    let max = min + limit;

    const pagesNumber = Array.from(Array(tot).keys())

    return {
      prev: min >= limit,
      arr: pagesNumber.slice(min, max),
      next: max < tot - 1
    }
  }

  const onOffset = (offset: string) => {
    if (offset === PrevNextPage.previous) {
      setOffset(offs - limit)
    } else {
      setOffset(offs + limit)
    }
  }

  const pg: IPageControl = arrRange(pages, offs)

  const onPrevNextPage = (type: string) => {
    const t = type == PrevNextPage.previous ? pg.prev : pg.next
    return t && <div onClick={() => onOffset(type)} className="pagination_prev_next_page">{type}</div>
  }

  return (
    <div className="pagination_container" >
      {onPrevNextPage(PrevNextPage.previous)}
      {pg?.arr ? pg?.arr?.map((page: number, i: number) => {
        return (
          <div
            key={`page${i}`}
            className={`${+active === page + 1 ? 'active' : ''} pages_list `}
            onClick={() => sendPage(page)}>
            {page + 1}
          </div>)
      }) : []}
      {onPrevNextPage(PrevNextPage.next)}
    </div>
  )
}

export default Pagination