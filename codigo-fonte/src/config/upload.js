const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Criar diretório de uploads se não existir (backup local)
const uploadDir = path.join(__dirname, '../../uploads/physical-assessments');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do storage para usar memória (não salvar no disco)
// Os arquivos serão enviados diretamente para o Azure
const storage = multer.memoryStorage();

// Filtro para aceitar apenas PDFs
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Apenas arquivos PDF são permitidos'), false);
    }
};

// Configuração do multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
        files: 1 // Apenas 1 arquivo por vez
    }
});

// Middleware para tratamento de erros do multer
const handleUploadError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                error: 'Arquivo muito grande. Tamanho máximo permitido: 5MB' 
            });
        }
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({ 
                error: 'Apenas um arquivo por vez é permitido' 
            });
        }
    }
    
    if (error.message === 'Apenas arquivos PDF são permitidos') {
        return res.status(400).json({ 
            error: 'Apenas arquivos PDF são permitidos' 
        });
    }
    
    next(error);
};

module.exports = {
    upload,
    handleUploadError,
    uploadDir
};
