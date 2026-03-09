import jwt from 'jsonwebtoken'

const authAdmin = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization
        console.log("Auth header:", authHeader)

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, login again"
            })
        }

        const token = authHeader.split(' ')[1]
        console.log("Token:", token)

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Decoded email:", decoded.email)

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, login again"
            })
        }

        next()

    } catch (error) {
        console.error(error)
        res.status(401).json({
            success: false,
            message: "Token invalid or expired"
        })
    }
}

export default authAdmin