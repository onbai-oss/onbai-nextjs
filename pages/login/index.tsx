import { Heading, Flex, Box, Image, FieldInput, Button, Text } from 'onui-ts'
import { BaseSyntheticEvent } from 'react'
import { UserPlus, ArrowRight } from 'react-feather'
import Link from 'next/link'
import { API } from '../../utils/api'
import { useRouter } from 'next/router'
import { PAGES } from '../../utils/constant'

const LoginForm = () => {
  const router = useRouter()

  const onChange = (e: BaseSyntheticEvent) => {
    console.log('-> on change', e.target.value)
  }
  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    console.log('On Submit', e.target)
    API.post('authentication', {
      strategy: 'local',
      email: e.target.email.value,
      password: e.target.password.value,
    })
      .then((res) => {
        console.log(res)
        router.push(PAGES.DASHBOARD)
      })
      .catch((e) => {
        console.error(e)
      })
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

        <FieldInput
          onChange={onChange}
          label="Mật khẩu"
          name="password"
          type="password"
          defaultValue="123456"
        ></FieldInput>
        <Flex mt="1" sx={{ justifyContent: 'flex-end' }}>
          <Link href="/forgot-password" passHref={true}>
            <Text as="a" sx={{ fontSize: 1, cursor: 'pointer' }}>
              Quên mật khẩu?
            </Text>
          </Link>
        </Flex>

        <Flex mt={3} sx={{ justifyContent: 'center' }}>
          <Button mr={3} icon={<ArrowRight size={16} />}>
            Đăng nhập
          </Button>
          <Link href="/signup" passHref={true}>
            <a>
              <Button variant="outline" icon={<UserPlus size={16} />}>
                Đăng ký
              </Button>
            </a>
          </Link>
        </Flex>
      </Box>
    </div>
  )
}

export default function LoginPage() {
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

            <LoginForm />
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
