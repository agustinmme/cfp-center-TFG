import Description from '../Description.jsx'
import HeaderEyebrow from './HeaderEyebrow.jsx'
import HeaderTitle from './HeaderTitle.jsx'

function PageHeader({ eyebrow, title, description, id }) {
  return (
    <div>
      <HeaderEyebrow>{eyebrow}</HeaderEyebrow>
      <HeaderTitle id={id}>{title}</HeaderTitle>
      {description ? <Description>{description}</Description> : null}
    </div>
  )
}

export default PageHeader
