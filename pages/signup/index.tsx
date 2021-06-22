import { Heading, Flex, Box, Image, FieldInput, Button, Text } from 'onui-ts'
import { BaseSyntheticEvent } from 'react'
import { UserPlus, ArrowRight } from 'react-feather'
import Link from 'next/link'
import { API } from '../../utils/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

const SignUpForm = () => {
  const router = useRouter()

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault()
    console.log('-> on onSubmit')
    API.post('users', {
      email: e.target.email.value,
      password: e.target.password.value,
    }).then((res) => {
      console.log(res)
      if (res.status === 201) {
        toast.success('Tạo tài khoản thành công.')
        router.push('/login')
      }
    })
  }

  const onChange = (e: BaseSyntheticEvent) => {
    console.log('-> on change', e.target.value)
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

        <FieldInput
          onChange={onChange}
          label="Nhập lại mật khẩu"
          name="repassword"
          type="password"
          defaultValue="123456"
        ></FieldInput>

        <Flex mt={3} sx={{ justifyContent: 'center' }}>
          <Button icon={<UserPlus size={16} />}>Đăng ký</Button>
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
              <Link href="/login">Onbai.app</Link>
            </Heading>

            <SignUpForm />
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
            <h1>FREE!</h1>
          </Box>
        </Flex>
      </Flex>
    </>
  )
}
