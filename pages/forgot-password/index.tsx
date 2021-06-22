import { Heading, Flex, Box, Image, FieldInput, Button, Text } from 'onui-ts'
import { BaseSyntheticEvent } from 'react'
import { UserPlus, ArrowRight } from 'react-feather'
import Link from 'next/link'
import { API } from '../../utils/api'

const ForgotPasswordForm = () => {
  const onChange = (e: BaseSyntheticEvent) => {
    console.log('-> on change', e.target.value)
  }
  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
      console.log('On Submit', e.target)
    // API.post('authentication', {
    //   email: e.target.email.value,
    // })
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((e) => {
    //     console.error(e)
    //   })
  }

  return (
    <div>
      <Box as="form" onSubmit={onSubmit}>
        <FieldInput
          onChange={onChange}
          label="Email"
          name="email"
          type="email"
          defaultValue="user@gmail.com"
        ></FieldInput>

        <Flex mt={3} sx={{ justifyContent: 'center' }}>
          <Button mr={3} icon={<ArrowRight size={16} />}>
            Gửi yêu cầu
          </Button>
        </Flex>
      </Box>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <>
      <Flex
        sx={{
          flexDirection: ['column', 'row'],
          width: '100%',
          height: '100vh',
        }}
      >
        <Flex
          bg="white"
          sx={{
            flexBasis: ['auto', '400px'],
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
          }}
        >
          <Box
            p={[4]}
            sx={{
              width: '100%',
            }}
          >
            <Heading mb="4" sx={{ textAlign: 'center' }}>
              <Link href="/">Onbai.app</Link>
            </Heading>

            <ForgotPasswordForm />
          </Box>
        </Flex>

        <Flex
          bg="seashell"
          sx={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'auto',
          }}
        >
          <Box
            p={4}
            sx={{
              width: '100%',
              textAlign: 'center',
            }}
          >
            <h1>
              Online school. digital internet tutorials and courses, online
              education.
            </h1>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
