import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import get from 'lodash/get'

import dataUrl from 'utils/dataUrl'
import Link from 'components/Link'
import formatPrice from 'utils/formatPrice'
import useConfig from 'utils/useConfig'

function altClick(e) {
  return e.button === 0 && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey
}

const ProductList = ({ products }) => {
  const history = useHistory()
  const match = useRouteMatch('/collections/:collection')
  const { config } = useConfig()
  const collectionParam = get(match, 'params.collection')
  const urlPrefix = collectionParam ? `/collections/${collectionParam}` : ''

  return (
    <div className="products">
      {products.length ? null : <div>No Products!</div>}
      {products.map(product => (
        <div
          key={product.id}
          className="product"
          onClick={e => {
            const pathname = `${urlPrefix}/products/${product.id}`
            if (altClick(e)) {
              history.push({ pathname, state: { scrollToTop: true } })
            } else {
              window.open(`#${pathname}`, '_blank')
            }
          }}
        >
          <div
            className="pic"
            style={{
              backgroundImage: `url(${dataUrl()}${product.id}/520/${
                product.image
              })`
            }}
          />
          <div className="product-body">
            <Link to={`${urlPrefix}/products/${product.id}`}>
              {product.title}
            </Link>
            <div className="price">
              {formatPrice(product.price)}
              {config.freeShipping ? (
                <span className="shipping">FREE Shipping</span>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductList
