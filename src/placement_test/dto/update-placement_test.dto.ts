import { PartialType } from '@nestjs/swagger';
import { CreatePlacementTestDto } from './create-placement_test.dto';

export class UpdatePlacementTestDto extends PartialType(CreatePlacementTestDto) {}
