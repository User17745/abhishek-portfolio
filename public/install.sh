#!/bin/bash

# Abhishek Aggarwal - Resume Installer
# Works on macOS, Linux, and Windows (via Git Bash or WSL)

set -e

# Resume URLs
RESUME_BASE_URL="https://docs.google.com/document/d"

RESUMES=(
  "sol_eng:1kP1IX6OMXoYBPBxpyfoNv1vDUrM-LMvPbMXuderXbNw:Pre-Sales_&_Solutions.pdf"
  "ecom:1J9Sqk0MlkItlSzXT1Xe3bxncScvFmAr2I1X7zgCfZhE:eCommerce.pdf"
  "pmo:1xjjTG_PsVGTjcSQie6i2F_vIESs0ISu2PSVdWdm6X0E:PMO.pdf"
  "shop_pm:1my5wMbzS0cvvYUm1mN7P0yVwmCLFkOlA3tgScoVnSjo:Shopify_TPM.pdf"
  "prod:1SUbVz3astELSNosjgKb8IZedU3tZ1luiLt-PcfsmEmg:Product_Manager.pdf"
  "tpm:11pYiI3uY3YhJ4HKQMjIerBxT9s2nXJEGKax-UWM4c24:Technical_PM.pdf"
)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Detect OS
detect_os() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "macos"
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "linux"
  elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    echo "windows"
  else
    echo "unknown"
  fi
}

# Open file based on OS
open_file() {
  local file="$1"
  local os=$(detect_os)
  
  case $os in
    macos)
      open "$file"
      ;;
    linux)
      if command -v xdg-open &> /dev/null; then
        xdg-open "$file"
      elif command -v gnome-open &> /dev/null; then
        gnome-open "$file"
      else
        echo -e "${YELLOW}Please open the file manually: $file${NC}"
      fi
      ;;
    windows)
      start "" "$file"
      ;;
    *)
      echo -e "${YELLOW}Please open the file manually: $file${NC}"
      ;;
  esac
}

# Download a resume
download_resume() {
  local id="$1"
  local doc_id="$2"
  local filename="$3"
  local output_dir="$4"
  
  local url="${RESUME_BASE_URL}/${doc_id}/export?format=pdf"
  local output_path="${output_dir}/${filename}"
  
  echo -e "  ${BLUE}⬇${NC} Downloading ${id}..."
  
  if command -v curl &> /dev/null; then
    curl -fsSL "$url" -o "$output_path" 2>/dev/null
  elif command -v wget &> /dev/null; then
    wget -q "$url" -O "$output_path" 2>/dev/null
  else
    echo -e "  ${RED}✗${NC} Neither curl nor wget found. Please install one of them."
    return 1
  fi
  
  if [[ -f "$output_path" ]] && [[ -s "$output_path" ]]; then
    echo -e "  ${GREEN}✓${NC} Downloaded: ${filename}"
    return 0
  else
    echo -e "  ${RED}✗${NC} Failed to download: ${filename}"
    return 1
  fi
}

# Print banner
print_banner() {
  echo ""
  echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║${NC}                                                              ${BLUE}║${NC}"
  echo -e "${BLUE}║${NC}   ${GREEN}Abhishek Aggarwal${NC} - Resume Installer          ${BLUE}║${NC}"
  echo -e "${BLUE}║${NC}   ${YELLOW}Documentation Loader v1.0${NC}                    ${BLUE}║${NC}"
  echo -e "${BLUE}║${NC}                                                              ${BLUE}║${NC}"
  echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════════════╝${NC}"
  echo ""
}

# Main function
main() {
  local flavor="${1:-all}"
  
  print_banner
  
  # Create output directory
  local home_dir="$HOME"
  if [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    home_dir="$USERPROFILE"
  fi
  
  local output_dir="${home_dir}/abhishek-aggarwal-resume"
  
  echo -e "${BLUE}Creating directory:${NC} ${output_dir}"
  mkdir -p "$output_dir"
  echo ""
  
  # Download resumes
  if [[ "$flavor" == "all" ]]; then
    echo -e "${YELLOW}Downloading all resume flavors...${NC}"
    echo ""
    
    for resume in "${RESUMES[@]}"; do
      IFS=':' read -r id doc_id filename <<< "$resume"
      download_resume "$id" "$doc_id" "$filename" "$output_dir"
    done
    
    echo ""
    echo -e "${GREEN}✓ All resumes downloaded to:${NC}"
    echo -e "  ${output_dir}"
    echo ""
    
    # Open the folder
    open_file "$output_dir"
  else
    local found=0
    
    for resume in "${RESUMES[@]}"; do
      IFS=':' read -r id doc_id filename <<< "$resume"
      
      if [[ "$id" == "$flavor" ]]; then
        found=1
        echo -e "${YELLOW}Downloading ${id} resume...${NC}"
        echo ""
        download_resume "$id" "$doc_id" "$filename" "$output_dir"
        
        echo ""
        echo -e "${GREEN}✓ Resume downloaded to:${NC}"
        echo -e "  ${output_dir}/${filename}"
        echo ""
        
        # Open the PDF
        open_file "${output_dir}/${filename}"
        break
      fi
    done
    
    if [[ $found -eq 0 ]]; then
      echo -e "${RED}Error: Unknown flavor '${flavor}'${NC}"
      echo ""
      echo -e "Available flavors:"
      echo -e "  ${GREEN}all${NC}       - Download all resumes"
      echo -e "  ${GREEN}sol_eng${NC}   - Pre-Sales & Solutions Engineering"
      echo -e "  ${GREEN}ecom${NC}      - eCommerce"
      echo -e "  ${GREEN}pmo${NC}       - PMO / Program Management"
      echo -e "  ${GREEN}shop_pm${NC}   - Shopify TPM"
      echo -e "  ${GREEN}prod${NC}      - Product Manager"
      echo -e "  ${GREEN}tpm${NC}       - Technical Project Manager"
      echo ""
      echo -e "Usage: curl -fsSL https://abhishekaggarwal.com/install.sh | bash -s -- \"<flavor>\""
      exit 1
    fi
  fi
  
  echo ""
  echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}Thanks for downloading!${NC}"
  echo -e "Connect with me: ${YELLOW}https://www.linkedin.com/in/abhishek-aggarwal-8bb82b100/${NC}"
  echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
  echo ""
}

# Run main function with provided argument
main "$1"
