import { BaseSyntheticEvent, useEffect } from 'react'

import {
  Button,
  Heading,
  Box,
  Flex,
  Label,
  Checkbox,
  Radio,
  Input,
  Select,
  Textarea,
  FieldInput,
} from 'onui-ts'

import { ArrowRight } from 'react-feather'

import Link from 'next/link'

export default function Home() {
  useEffect(() => {
    console.log('Home load')
  }, [])

  const onChange = (e: BaseSyntheticEvent) => {
    console.log('-> on change', e.target.value)
  }
  return (
    <div>
      <main>
        <Box p={2}>
          <Link href="/login">
            <a>Login</a>
          </Link>

          <Heading my="3">#BUTTONS</Heading>

          <Flex p={2}>
            <Button mr={2} icon={<ArrowRight size={16} />}>
              Icon
            </Button>
            <Button mr={2}>Primary</Button>
            <Button mr={2} variant="outline">
              Outline
            </Button>
          </Flex>

          <Flex p={2}>
            <Button mr={2} variant="info" icon={<ArrowRight size={16} />}>
              Icon
            </Button>
            <Button mr={2} variant="info">
              Info
            </Button>
            <Button mr={2} variant="info_outline">
              Outline
            </Button>
          </Flex>

          <Flex p={2}>
            <Button mr={2} variant="warning" icon={<ArrowRight size={16} />}>
              Icon
            </Button>
            <Button mr={2} variant="warning">
              Warning
            </Button>
            <Button mr={2} variant="warning_outline">
              Outline
            </Button>
          </Flex>

          <Flex p={2}>
            <Button mr={2} variant="danger" icon={<ArrowRight size={16} />}>
              Icon
            </Button>
            <Button mr={2} variant="danger">
              Danger
            </Button>
            <Button mr={2} variant="danger_outline">
              Outline
            </Button>
          </Flex>

          <Flex p={2}>
            <Button mr={2} icon={<ArrowRight size={16} />} disabled>
              Icon
            </Button>
            <Button mr={2} disabled>
              Disabled
            </Button>
            <Button mr={2} disabled>
              Outline
            </Button>
          </Flex>

          <Heading my="3">#FROMS</Heading>

          <Box as="form" sx={{ maxWidth: 360 }}>
            <FieldInput
              onChange={onChange}
              label="Field text"
              name="field-text"
              type="text"
            ></FieldInput>

            <FieldInput
              onChange={onChange}
              label="Field password"
              name="field-password"
              type="password"
            ></FieldInput>

            <FieldInput
              onChange={onChange}
              label="Field email"
              name="field-email"
              type="email"
            ></FieldInput>

            <FieldInput
              onChange={onChange}
              label="Field tel"
              name="field-tel"
              type="tel"
            ></FieldInput>

            <FieldInput
              onChange={onChange}
              label="Field search"
              name="field-search"
              type="search"
            ></FieldInput>

            <Box>
              <Label mb={3}>
                <Checkbox />
                Remember me
              </Label>
            </Box>
            <Label htmlFor="sound">Sound</Label>
            <Select name="sound" id="sound" mb={3}>
              <option>Beep</option>
              <option>Boop</option>
              <option>Blip</option>
            </Select>
            <Label htmlFor="comment">Comment</Label>
            <Textarea name="comment" id="comment" rows={6} mb={3} />
            <Flex mb={3}>
              <Label>
                <Radio name="letter" /> Alpha
              </Label>
              <Label>
                <Radio name="letter" /> Bravo
              </Label>
              <Label>
                <Radio name="letter" /> Charlie
              </Label>
            </Flex>
            <Button icon={<ArrowRight size={16} />}>Submit</Button>
          </Box>
        </Box>
      </main>
    </div>
  )
}
