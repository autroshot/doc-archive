---
sidebar_position: 4
---

# 스타일 프롭

스타일 프롭은 간단히 프롭을 전달하여 컴포넌트의 스타일을 변경하는 방법입니다. 컴포넌트의 스타일을 지정하는 유용한 약칭을 이용해 시간을 절약할 수 있습니다.

## 참고

다음 표는 모든 스타일 프롭의 목록과 해당하는 CSS 속성을 보여줍니다.

### 마진과 패딩

```jsx
import { Box } from "@chakra-ui/react"

// m={2}는 theme.space[2]의 값을 나타냅니다.
<Box m={2}>Tomato</Box>

// 사용자 지정 값을 사용하는 것도 가능합니다.
<Box maxW="960px" mx="auto" />

// 모든 뷰포트에 마진 8px을 설정하고 첫 번째 중단점 이상에 12px을 설정합니다.
<Box m={[2, 3]} />
```

| 프롭 | CSS 프로퍼티 | 테마 키 |
| --------------------- | --------------------------------------------- | --------- |
| `m`, `margin` | `margin` | `space` |
| `mt`, `marginTop` | `margin-top` | `space` |
| `mr`, `marginRight` | `margin-right` | `space` |
| `me`, `marginEnd` | `margin-inline-end` | `space` |
| `mb`, `marginBottom` | `margin-bottom` | `space` |
| `ml`, `marginLeft` | `margin-left` | `space` |
| `ms`, `marginStart` | `margin-inline-start` | `space` |
| `mx`, `marginX` | `margin-inline-start` + `margin-inline-end` | `space` |
| `my`, `marginY` | `margin-top` + `margin-bottom` | `space` |
| `p`, `padding` | `padding` | `space` |
| `pt`, `paddingTop` | `padding-top` | `space` |
| `pr`, `paddingRight` | `padding-right` | `space` |
| `pe`, `paddingEnd` | `padding-inline-end` | `space` |
| `pb`, `paddingBottom` | `padding-bottom` | `space` |
| `pl`, `paddingLeft` | `padding-left` | `space` |
| `ps`, `paddingStart` | `padding-inline-start` | `space` |
| `px`, `paddingX` | `padding-inline-start` + `padding-inline-end` | `space` |
| `py`, `paddingY` | `padding-top` + `padding-bottom` | `space` |

:::note 참고

`mx`와 `px` 프롭은 생성된 스타일이 RTL 친화적임을 보장하기 위해 `margin-inline-start` 및 `margin-inline-end`를 사용합니다.

:::

### 색상과 배경색

```jsx
import { Box } from "@chakra-ui/react"

// 점 표기법을 사용하여 중첩된 색상 값을 선택합니다.
// => `theme.colors.gray[50]`
<Box color='gray.50' />

// 원시 CSS 색상 값
<Box color='#f00' />

// 배경색
<Box bg='tomato' />

// 장황한 프롭
<Box backgroundColor='tomato' />
```

| 프롭 | CSS 프로퍼티 | 테마 키 |
| ------------------ | ------------------ | --------- |
| `color` | `color` | `colors` |
| `bg`, `background` | `background` | `colors` |
| `bgColor` | `background-color` | `colors` |
| `opacity` | `opacity` | 없음 |

### 그레이디언트

```jsx
import { Box, Text } from "@chakra-ui/react"

// 선형 그레이디언트와 색상 트랜지션을 추가합니다.
<Box w="100%" h="200px" bgGradient="linear(to-t, green.200, pink.500)" />

// 방사형 그레이디언트와 색상 트랜지션을 추가합니다.
<Box w="100%" h="200px" bgGradient="radial(gray.300, yellow.400, pink.200)" />

// 텍스트 그레이디언트를 추가합니다.
<Text
  bgGradient="linear(to-l, #7928CA, #FF0080)"
  bgClip="text"
  fontSize="6xl"
  fontWeight="extrabold"
>
  Welcome to Chakra UI
</Text>

```

| 프롭 | CSS 프로퍼티 | 테마 키 |
| -------------------------- | ------------------ | --------- |
| `bgGradient` | `background-image` | 없음 |
| `bgClip`, `backgroundClip` | `background-clip` | 없음 |

### 타이포그래피

```jsx
import { Text } from "@chakra-ui/react"

// theme.fontSizes.md의 font-size
<Text fontSize="md" />

// font-size 32px
<Text fontSize={32} />

// font-size 2em
<Text fontSize='2em' />

// 모든 뷰포트에 text-align left를 설정하고 첫 번째 중단점 이상에 center를 설정합니다.
<Text textAlign={[ 'left', 'center' ]} />
```

| 프롭 | CSS 프로퍼티 | 테마 키 |
| ---------------- | ----------------- | ---------------- |
| `fontFamily` | `font-family` | `fonts` |
| `fontSize` | `font-size` | `fontSizes` |
| `fontWeight` | `font-weight` | `fontWeights` |
| `lineHeight` | `line-height` | `lineHeights` |
| `letterSpacing` | `letter-spacing` | `letterSpacings` |
| `textAlign` | `text-align` | 없음 |
| `fontStyle` | `font-style` | 없음 |
| `textTransform` | `text-transform` | 없음 |
| `textDecoration` | `text-decoration` | 없음 |

### 레이아웃, 너비와 높이

```jsx
import { Box } from "@chakra-ui/react"

// 장황함
<Box width="100%" height={32} />

// 약칭
<Box w="100%" h="32px" />

// 테마의 크기 사용
<Box boxSize="sm" />

// 너비 256px
<Box w={256} />

// 너비 40px
<Box w='40px' />

```

| 프롭 | CSS 프로퍼티 | 테마 키 |
| ------------------- | ----------------- | --------- |
| `w`, `width` | `width` | `sizes` |
| `h`, `height` | `height` | `sizes` |
| `minW`, `minWidth` | `min-width` | `sizes` |
| `maxW`, `maxWidth` | `max-width` | `sizes` |
| `minH`, `minHeight` | `min-height` | `sizes` |
| `maxH`, `maxHeight` | `max-height` | `sizes` |
| `display` | `display` | 없음 |
| `boxSize` | `width`, `height` | `sizes` |
| `verticalAlign` | `vertical-align` | 없음 |
| `overflow` | `overflow` | 없음 |
| `overflowX` | `overflow-x` | 없음 |
| `overflowY` | `overflow-y` | 없음 |

### 플렉스박스

```jsx
import { Box, Flex } from "@chakra-ui/react"

// 장황함
<Box display="flex" alignItems="center" justifyContent="space-between">
  Box with Flex props
</Box>

// Flex 컴포넌트를 이용한 약칭
<Flex align="center" justify="center">
  Flex Container
</Flex>
```

:::note 참고

`*` 프롭은 `Flex` 컴포넌트를 사용할 때만 작동합니다.

:::

| 프롭 | CSS 프로퍼티 | 테마 키 |
| ----------------------------------------- | ----------------- | --------- |
| `gap` | `gap` | `space` |
| `rowGap` | `row-gap` | `space` |
| `columnGap` | `column-gap` | `space` |
| `alignItems`, \*`align` | `align-items` | 없음 |
| `alignContent` | `align-content` | 없음 |
| `justifyItems` | `justify-items` | 없음 |
| `justifyContent`, \*`justify` | `justify-content` | 없음 |
| `flexWrap`, \*`wrap` | `flex-wrap` | 없음 |
| `flexDirection`, `flexDir`, \*`direction` | `flex-direction` | 없음 |
| `flex` | `flex` | 없음 |
| `flexGrow` | `flex-grow` | 없음 |
| `flexShrink` | `flex-shrink` | 없음 |
| `flexBasis` | `flex-basis` | 없음 |
| `justifySelf` | `justify-self` | 없음 |
| `alignSelf` | `align-self` | 없음 |
| `order` | `order` | 없음 |

### 그리드 레이아웃

```jsx
import { Box, Grid } from "@chakra-ui/react"

// 장황함
<Box display="grid" gridGap={2} gridAutoFlow="row dense">
  Grid
</Box>

// Grid 컴포넌트를 이용한 약칭
<Grid gap={2} autoFlow="row dense">
  Grid
</Grid>
```

:::note 참고

`*` 프롭은 `Grid` 컴포넌트를 사용할 때만 작동합니다.

:::

| 프롭 | CSS 프로퍼티 | 테마 키 |
| ------------------------------------------ | ----------------------- | --------- |
| `gridGap`, \*`gap` | `grid-gap` | `space` |
| `gridRowGap`, \*`rowGap` | `grid-row-gap` | `space` |
| `gridColumnGap`, \*`columnGap` | `grid-column-gap` | `space` |
| `gridColumn`, \*`column` | `grid-column` | 없음 |
| `gridRow`, \*`row` | `grid-row` | 없음 |
| `gridArea`, \*`area` | `grid-area` | 없음 |
| `gridAutoFlow`, \*`autoFlow` | `grid-auto-flow` | 없음 |
| `gridAutoRows`, \*`autoRows` | `grid-auto-rows` | 없음 |
| `gridAutoColumns`, \*`autoColumns` | `grid-auto-columns` | 없음 |
| `gridTemplateRows`, \*`templateRows` | `grid-template-rows` | 없음 |
| `gridTemplateColumns`, \*`templateColumns` | `grid-template-columns` | 없음 |
| `gridTemplateAreas`, \*`templateAreas` | `grid-template-areas` | 없음 |

### 배경

```jsx
import { Box } from "@chakra-ui/react"

// 장황함
<Box
  backgroundImage="url('/images/kyuubi.png')"
  backgroundPosition="center"
  backgroundRepeat="no-repeat"
/>

// 약칭
<Box
  bgImage="url('/images/gaara.png')"
  bgPosition="center"
  bgRepeat="no-repeat"
/>
```

| 프롭 | CSS 프로퍼티 | 테마 키 |
| ------------------------------------- | ----------------------- | --------- |
| `bg`, `background` | `background` | 없음 |
| `bgImage`, `backgroundImage` | `background-image` | 없음 |
| `bgSize`, `backgroundSize` | `background-size` | 없음 |
| `bgPosition`, `backgroundPosition` | `background-position` | 없음 |
| `bgRepeat`, `backgroundRepeat` | `background-repeat` | 없음 |
| `bgAttachment`, `backgroundAttachment` | `background-attachment` | 없음 |

### 테두리

```jsx
<Box border='1px' borderColor='gray.200'>
  Card
</Box>
```

| 프롭 | CSS 프로퍼티 | 테마 필드 |
| ------------------- | ------------------------------ | -------------- |
| `border` | `border` | `borders` |
| `borderWidth` | `border-width` | `borderWidths` |
| `borderStyle` | `border-style` | `borderStyles` |
| `borderColor` | `border-color` | `colors` |
| `borderTop` | `border-top` | `borders` |
| `borderTopWidth` | `border-top-width` | `borderWidths` |
| `borderTopStyle` | `border-top-style` | `borderStyles` |
| `borderTopColor` | `border-top-color` | `colors` |
| `borderRight` | `border-right` | `borders` |
| `borderEnd` | `border-inline-end` | `borders` |
| `borderRightWidth` | `border-right-width` | `borderWidths` |
| `borderEndWidth` | `border-inline-end-width` | `borderWidths` |
| `borderRightStyle` | `border-right-style` | `borderStyles` |
| `borderEndStyle` | `border-inline-end-style` | `borderStyles` |
| `borderRightColor` | `border-right-color` | `colors` |
| `borderEndColor` | `border-inline-end-color` | `colors` |
| `borderBottom` | `border-bottom` | `borders` |
| `borderBottomWidth` | `border-bottom-width` | `borderWidths` |
| `borderBottomStyle` | `border-bottom-style` | `borderStyles` |
| `borderBottomColor` | `border-bottom-color` | `colors` |
| `borderLeft` | `border-left` | `borders` |
| `borderStart` | `border-inline-start` | `borders` |
| `borderLeftWidth` | `border-left-width` | `borderWidths` |
| `borderStartWidth` | `border-inline-start-width` | `borderWidths` |
| `borderLeftStyle` | `border-left-style` | `borderStyles` |
| `borderStartStyle` | `border-inline-start-style` | `borderStyles` |
| `borderLeftColor` | `border-left-color` | `colors` |
| `borderStartColor` | `border-inline-start-color` | `colors` |
| `borderX` | `border-left` , `border-right` | `borders` |
| `borderY` | `border-top` , `border-bottom` | `borders` |

### 테두리 반경

```jsx
import { Button } from "@chakra-ui/react"

// 이 버튼은 오른쪽 borderRadius가 없습니다.
<Button borderRightRadius="0">Button 1</Button>

// 이 버튼은 왼쪽 borderRadius가 없습니다.
<Button borderLeftRadius="0">Button 2</Button>

// 왼쪽 상단과 오른쪽 상단 반경은 theme.radii.md => 4px가 됩니다.
<Button borderTopRadius="md">Button 2</Button>
```

| 프롭 | CSS 프로퍼티 | 테마 필드 |
| ------------------------- | ---------------------------------------------------------------------------- | ----------- |
| `borderRadius` | `border-radius` | `radii` |
| `borderTopLeftRadius` | `border-top-left-radius` | `radii` |
| `borderTopStartRadius` | `border-top-left-radius` in LTR,<br/> `border-top-right-radius` in RTL | `radii` |
| `borderTopRightRadius` | `border-top-right-radius` | `radii` |
| `borderTopEndRadius` | `border-top-right-radius` in LTR,<br/> `border-top-left-radius` in RTL | `radii` |
| `borderBottomRightRadius` | `border-bottom-right-radius` | `radii` |
| `borderBottomEndRadius` | `border-bottom-right-radius` in LTR,<br/> `border-bottom-left-radius` in RTL | `radii` |
| `borderBottomLeftRadius` | `border-bottom-left-radius` | `radii` |
| `borderBottomStartRadius` | `border-bottom-left-radius` in LTR,<br/> `border-bottom-left-radius` in RTL | `radii` |
| `borderTopRadius` | `border-top-left-radius` + `border-top-right-radius` | `radii` |
| `borderRightRadius` | `border-top-right-radius` + `border-bottom-right-radius` | `radii` |
| `borderEndRadius` | `border-top-right-radius` + `border-bottom-right-radius` | `radii` |
| `borderBottomRadius` | `border-bottom-left-radius` + `border-bottom-right-radius` | `radii` |
| `borderLeftRadius` | `border-top-left-radius` + `border-bottom-left-radius` | `radii` |
| `borderStartRadius` | `border-top-left-radius` + `border-bottom-left-radius` | `radii` |

### 위치

```jsx
import { Box } from "@chakra-ui/react"

// 장황함
<Box position="absolute">Cover</Box>

// 약칭
<Box pos="absolute">Cover</Box>
<Box pos="absolute" top="0" left="0">
  Absolute with top and left
</Box>
<Box pos="fixed" w="100%" zIndex={2}>
  Fixed with zIndex
</Box>
```

| 프롭 | CSS 프로퍼티 | 테마 필드 |
| ---------------- | ------------ | ----------- |
| `pos`, `position` | `position` | 없음 |
| `zIndex` | `z-index` | `zIndices` |
| `top` | `top` | `space` |
| `right` | `right` | `space` |
| `bottom` | `bottom` | `space` |
| `left` | `left` | `space` |

### 그림자

```jsx
<SimpleGrid
  bg='gray.50'
  columns={{ sm: 2, md: 4 }}
  spacing='8'
  p='10'
  textAlign='center'
  rounded='lg'
  color='gray.400'
>
  <Box boxShadow='xs' p='6' rounded='md' bg='white'>
    xs
  </Box>
  <Box boxShadow='sm' p='6' rounded='md' bg='white'>
    sm
  </Box>
  <Box boxShadow='base' p='6' rounded='md' bg='white'>
    Base
  </Box>
  <Box boxShadow='md' p='6' rounded='md' bg='white'>
    md
  </Box>
  <Box boxShadow='lg' p='6' rounded='md' bg='white'>
    lg
  </Box>
  <Box boxShadow='xl' p='6' rounded='md' bg='white'>
    xl
  </Box>
  <Box boxShadow='2xl' p='6' rounded='md' bg='white'>
    2xl
  </Box>
  <Box boxShadow='dark-lg' p='6' rounded='md' bg='white'>
    Dark lg
  </Box>
  <Box boxShadow='outline' p='6' rounded='md' bg='white'>
    Outline
  </Box>
  <Box boxShadow='inner' p='6' rounded='md' bg='white'>
    Inner
  </Box>
</SimpleGrid>
```

```jsx
<Text textShadow='1px 1px #ff0000' m='6'>
  Text with shadows
</Text>
```

| 프롭 | CSS 프로퍼티 | 테마 필드 |
| --------------------- | ------------- | ----------- |
| `textShadow` | `text-shadow` | `shadows` |
| `shadow`, `boxShadow` | `box-shadow` | `shadows` |

### 필터

```jsx
function Filters() {
  const basicBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSize: '250px',
    color: 'white',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
    px: 4,
    background:
      'url(https://picsum.photos/id/1080/200/300) center/cover no-repeat',
  }
  return (
    <Flex flexWrap='wrap' gap='24px' justifyContent='space-evenly'>
      {/* 요소에 filter 프로퍼티 추가하기 */}
      <Box sx={basicBoxStyles} filter='grayscale(80%)'>
        Box with Filter
      </Box>
      {/* 요소에 blur 프로퍼티 추가하기 */}
      <Box sx={basicBoxStyles} filter='auto' blur='2px'>
        Box with Blur
      </Box>
      {/* 요소에 brightness 프로퍼티 추가하기 */}
      <Box sx={basicBoxStyles} filter='auto' brightness='40%'>
        Box with Brightness
      </Box>
    </Flex>
  )
}
```

:::note 참고

요소에 `blur`, `brightness`, `contrast`, `hueRotate`, `invert`,
`saturate` 프롭을 적용하려면, `filter` 프롭의 값을 `auto`로 지정합니다.

:::

```jsx
function BackdropFilters() {
  const outerBoxStyles = {
    boxSize: '250px',
    p: '10',
    background:
      'url(https://picsum.photos/id/1068/200/300) center/cover no-repeat',
  }

  const innerBoxStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxSize: 'full',
    color: 'white',
    textShadow: '0 0 20px black',
    fontWeight: 'bold',
    fontSize: '20px',
  }
  return (
    <Flex flexWrap='wrap' gap='24px' justifyContent='space-evenly'>
      {/* 요소에 backdrop-filter 프로퍼티 추가하기 */}
      <Box sx={outerBoxStyles}>
        <Box sx={innerBoxStyles} backdropFilter='invert(100%)'>
          Box with Backdrop Filter
        </Box>
      </Box>
      {/* 요소에 backdrop-blur 프로퍼티 추가하기 */}
      <Box sx={outerBoxStyles}>
        <Box sx={innerBoxStyles} backdropFilter='auto' backdropBlur='8px'>
          Box with Backdrop Blur
        </Box>
      </Box>
      {/* 요소에 backdrop-contrast 프로퍼티 추가하기 */}
      <Box sx={outerBoxStyles}>
        <Box sx={innerBoxStyles} backdropFilter='auto' backdropContrast='30%'>
          Box with Backdrop Contrast
        </Box>
      </Box>
    </Flex>
  )
}
```

:::caution

`backdrop-filter`는 파이어폭스에서 지원되지 않습니다. 사용자가 활성화할 수 있지만, 해당 프로퍼티의 유무에 상관없이 보기 좋은 컴포넌트를 설계하는 것이 좋습니다.

:::

:::note 참고

요소에 `backdropBlur`, `backdropBrightness`, `backdropContrast`, `backdropHueRotate`, `backdropInvert`, `backdropSaturate` 프롭을 적용하려면, `backdropFilter` 프롭의 값을 `auto`로 지정합니다.

:::

| 프롭 | CSS 프로퍼티 | 테마 필드 |
| -------------------- | ----------------- | ----------- |
| `filter` | `filter` | 없음 |
| `blur` | `filter` | `blur` |
| `brightness` | `filter` | 없음 |
| `contrast` | `filter` | 없음 |
| `hueRotate` | `filter` | 없음 |
| `invert` | `filter` | 없음 |
| `saturate` | `filter` | 없음 |
| `dropShadow` | `filter` | `shadows` |
| `backdropFilter` | `backdrop-filter` | 없음 |
| `backdropBlur` | `backdrop-filter` | `blur` |
| `backdropBrightness` | `backdrop-filter` | 없음 |
| `backdropContrast` | `backdrop-filter` | 없음 |
| `backdropHueRotate` | `backdrop-filter` | 없음 |
| `backdropInvert` | `backdrop-filter` | 없음 |
| `backdropSaturate` | `backdrop-filter` | 없음 |

### 의사

```jsx
import { Button } from "@chakra-ui/react"

// :hover 스타일
<Button
  colorScheme="teal"
  _hover={{
    background: "white",
    color: "teal.500",
  }}
>
  Hover me
</Button>

// 부모 요소에 :hover를 적용합니다.
<Box
  role="group"
>
  <Box
    _hover={{ fontWeight: 'semibold' }}
    _groupHover={{ color: 'tomato' }}
  >
  </Box>
</Box>

// ::before 의사 요소를 추가합니다.
// 콘텐츠 값에는 추가 따옴표가 필요하다는 것을 유의하세요.
<Box
  _before={{ content: '"🙂"', display: 'inline-block', mr: '5px' }}
>
  A pseudo element
</Box>

```

| 프롭 | CSS 프로퍼티 | 테마 필드 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `_hover` | `&:hover`<br />`&[data-hover]` | 없음 |
| `_active` | `&:active`<br />`&[data-active]` | 없음 |
| `_focus` | `&:focus`<br />`&[data-focus]` | 없음 |
| `_highlighted` | `&[data-highlighted]` | 없음 |
| `_focusWithin` | `&:focus-within` | 없음 |
| `_focusVisible` | `&:focus-visible` | 없음 |
| `_disabled` | `&[disabled]`<br />`&[aria-disabled=true]`<br />`&[data-disabled]` | 없음 |
| `_readOnly` | `&[aria-readonly=true]`<br />`&[readonly]`<br />`&[data-readonly]` | 없음 |
| `_before` | `&::before` | 없음 |
| `_after` | `&::after` | 없음 |
| `_empty` | `&:empty` | 없음 |
| `_expanded` | `&[aria-expanded=true]`<br />`&[data-expanded]` | 없음 |
| `_checked` | `&[aria-checked=true]`<br />`&[data-checked]` | 없음 |
| `_grabbed` | `&[aria-grabbed=true]`<br />`&[data-grabbed]` | 없음 |
| `_pressed` | `&[aria-pressed=true]`<br />`&[data-pressed]` | 없음 |
| `_invalid` | `&[aria-invalid=true]`<br />`&[data-invalid]` | 없음 |
| `_valid` | `&[data-valid]`<br />`&[data-state=valid]` | 없음 |
| `_loading` | `&[data-loading]`<br />`&[aria-busy=true]` | 없음 |
| `_selected` | `&[aria-selected=true]`<br />`&[data-selected]` | 없음 |
| `_hidden` | `&[hidden]`<br />`&[data-hidden]` | 없음 |
| `_autofill` | `&:-webkit-autofill` | 없음 |
| `_even` | `&:nth-of-type(even)` | 없음 |
| `_odd` | `&:nth-of-type(odd)` | 없음 |
| `_first` | `&:first-of-type` | 없음 |
| `_last` | `&:last-of-type` | 없음 |
| `_notFirst` | `&:not(:first-of-type)` | 없음 |
| `_notLast` | `&:not(:last-of-type)` | 없음 |
| `_visited` | `&:visited` | 없음 |
| `_activeLink` | `&[aria-current=page]` | 없음 |
| `_activeStep` | `&[aria-current=step]` | 없음 |
| `_indeterminate` | `&:indeterminate`<br />`&[aria-checked=mixed]`<br />`&[data-indeterminate]` | 없음 |
| `_groupHover` | `[role=group]:hover &`<br />`[role=group][data-hover] &`<br />`[data-group]:hover &`<br />`[data-group][data-hover] &`<br />`.group:hover &`<br />`.group[data-hover] &` | 없음 |
| `_peerHover` | `[data-peer]:hover ~ &`<br />`[data-peer][data-hover] ~ &`<br />`.peer:hover ~ &`<br />`.peer[data-hover] ~ &` | 없음 |
| `_groupFocus` | `[role=group]:focus &`<br />`[role=group][data-focus] &`<br />`[data-group]:focus &`<br />`[data-group][data-focus] &`<br />`.group:focus &`<br />`.group[data-focus] &` | 없음 |
| `_peerFocus` | `[data-peer]:focus ~ &`<br />`[data-peer][data-focus] ~ &`<br />`.peer:focus ~ &`<br />`.peer[data-focus] ~ &` | 없음 |
| `_groupFocusVisible` | `[role=group]:focus-visible &`<br />`[data-group]:focus-visible &`<br />`.group:focus-visible &` | 없음 |
| `_peerFocusVisible` | `[data-peer]:focus-visible ~ &`<br />`.peer:focus-visible ~ &` | 없음 |
| `_groupActive` | `[role=group]:active &`<br />`[role=group][data-active] &`<br />`[data-group]:active &`<br />`[data-group][data-active] &`<br />`.group:active &`<br />`.group[data-active] &` | 없음 |
| `_peerActive` | `[data-peer]:active ~ &`<br />`[data-peer][data-active] ~ &`<br />`.peer:active ~ &`<br />`.peer[data-active] ~ &` | 없음 |
| `_groupDisabled` | `[role=group]:disabled &`<br />`[role=group][data-disabled] &`<br />`[data-group]:disabled &`<br />`[data-group][data-disabled] &`<br />`.group:disabled &`<br />`.group[data-disabled] &` | 없음 |
| `_peerDisabled` | `[data-peer]:disabled ~ &`<br />`[data-peer][data-disabled] ~ &`<br />`.peer:disabled ~ &`<br />`.peer[data-disabled] ~ &` | 없음 |
| `_groupInvalid` | `[role=group]:invalid &`<br />`[role=group][data-invalid] &`<br />`[data-group]:invalid &`<br />`[data-group][data-invalid] &`<br />`.group:invalid &`<br />`.group[data-invalid] &` | 없음 |
| `_peerInvalid` | `[data-peer]:invalid ~ &`<br />`[data-peer][data-invalid] ~ &`<br />`.peer:invalid ~ &`<br />`.peer[data-invalid] ~ &` | 없음 |
| `_groupChecked` | `[role=group]:checked &`<br />`[role=group][data-checked] &`<br />`[data-group]:checked &`<br />`[data-group][data-checked] &`<br />`.group:checked &`<br />`.group[data-checked] &` | 없음 |
| `_peerChecked` | `[data-peer]:checked ~ &`<br />`[data-peer][data-checked] ~ &`<br />`.peer:checked ~ &`<br />`.peer[data-checked] ~ &` | 없음 |
| `_groupFocusWithin` | `[role=group]:focus-within &`<br />`[data-group]:focus-within &`<br />`.group:focus-within &` | 없음 |
| `_peerFocusWithin` | `[data-peer]:focus-within ~ &`<br />`.peer:focus-within ~ &` | 없음 |
| `_peerPlaceholderShown` | `[data-peer]:placeholder-shown ~ &`<br />`.peer:placeholder-shown ~ &` | 없음 |
| `_placeholder` | `&::placeholder` | 없음 |
| `_placeholderShown` | `&:placeholder-shown` | 없음 |
| `_fullScreen` | `&:fullscreen` | 없음 |
| `_selection` | `&::selection` | 없음 |
| `_rtl` | `[dir=rtl] &`<br />`&[dir=rtl]` | 없음 |
| `_ltr` | `[dir=ltr] &`<br />`&[dir=ltr]` | 없음 |
| `_mediaDark` | `@media (prefers-color-scheme: dark)` | 없음 |
| `_mediaReduceMotion` | `@media (prefers-reduced-motion: reduce)` | 없음 |
| `_dark` | `.chakra-ui-dark &`<br />`[data-theme=dark] &`<br />`&[data-theme=dark]` | 없음 |
| `_light` | `.chakra-ui-light &`<br />`[data-theme=light] &`<br />`&[data-theme=light]` | 없음 |

### 기타 프롭

위에 나열된 모든 공통 스타일 프롭을 제외하고, 모든 컴포넌트는 다음 프롭을 허용합니다.

| 프롭 | CSS 프로퍼티 | 테마 필드 |
| ----------------- | ------------------ | ----------- |
| `animation` | `animation` | 없음 |
| `appearance` | `appearance` | 없음 |
| `content` | `content` | 없음 |
| `transform` | `transform` | 없음 |
| `transformOrigin` | `transform-origin` | 없음 |
| `visibility` | `visibility` | 없음 |
| `whiteSpace` | `white-space` | 없음 |
| `userSelect` | `user-select` | 없음 |
| `pointerEvents` | `pointer-events` | 없음 |
| `wordBreak` | `word-break` | 없음 |
| `overflowWrap` | `overflow-wrap` | 없음 |
| `textOverflow` | `text-overflow` | 없음 |
| `boxSizing` | `box-sizing` | 없음 |
| `cursor` | `cursor` | 없음 |
| `resize` | `resize` | 없음 |
| `transition` | `transition` | 없음 |
| `objectFit` | `object-fit` | 없음 |
| `objectPosition` | `object-position` | 없음 |
| `float` | `float` | 없음 |
| `fill` | `fill` | `colors` |
| `stroke` | `stroke` | `colors` |
| `outline` | `outline` | 없음 |

## `as` 프롭

`as` 프롭을 이용하면 렌더링할 HTML 태그 또는 컴포넌트를 전달할 수 있습니다. 모든 컴포넌트에서 사용 가능합니다.

예를 들어 `Button` 컴포넌트를 링크로 사용하고 싶다고 가정해 보겠습니다. `a`와 `Button`을 다음과 같이 구성할 수 있습니다.

```jsx
<Button as='a' target='_blank' variant='outline' href='https://chakra-ui.com'>
  Hello
</Button>
```

이를 통해 버튼을 `a` 컴포넌트로 감싸지 않고도 모든 `Button` 프롭과 `a` 프롭을 사용할 수 있게 됩니다.