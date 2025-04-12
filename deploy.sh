#!/bin/bash
# Script untuk deployment aplikasi

# Warna untuk output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Memulai proses deployment aplikasi ===${NC}"

# 1. Install dependencies
echo -e "\n${YELLOW}1. Menginstall dependencies...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}Gagal menginstall dependencies. Deployment dihentikan.${NC}"
    exit 1
fi
echo -e "${GREEN}Dependencies berhasil diinstall.${NC}"

# 2. Jalankan migrasi database
echo -e "\n${YELLOW}2. Mempersiapkan database...${NC}"
npm run db:push
if [ $? -ne 0 ]; then
    echo -e "${RED}Gagal melakukan migrasi database. Deployment dihentikan.${NC}"
    exit 1
fi
echo -e "${GREEN}Database berhasil dipersiapkan.${NC}"

# 3. Build aplikasi frontend
echo -e "\n${YELLOW}3. Melakukan build frontend...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Gagal melakukan build frontend. Deployment dihentikan.${NC}"
    exit 1
fi
echo -e "${GREEN}Frontend berhasil di-build.${NC}"

# 4. Cek folder uploads
echo -e "\n${YELLOW}4. Memastikan folder uploads tersedia...${NC}"
if [ ! -d "uploads" ]; then
    mkdir -p uploads
fi
echo -e "${GREEN}Folder uploads siap.${NC}"

# 5. Setup selesai
echo -e "\n${GREEN}=== Deployment selesai! ===${NC}"
echo -e "Untuk menjalankan aplikasi dalam mode production:"
echo -e "  ${YELLOW}npm start${NC}"
echo ""
echo -e "Atau jika menggunakan PM2:"
echo -e "  ${YELLOW}pm2 start npm --name \"aplikasi-desa\" -- start${NC}"
echo ""